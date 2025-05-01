import { askGemini } from "~/bot/gemini";
import extractAllFolders from "~/libs/extractAllFolders";
import flattenFileTree from "~/libs/flattenFileTree";
import { FileTree, VideoSelection } from "~/types";

async function selectBestFolderWithGemini(
    folderNames: string[],
    text: string,
    keywords: string[]
): Promise<string | null> {
    const prompt = `
  Bạn là trợ lý chọn video vũ trụ theo nội dung mô tả. Dưới đây là một đoạn mô tả và các từ khóa liên quan:
  
  Đoạn mô tả:
  "${text}"
  
  Từ khóa: ${keywords.join(", ")}
  
  Các thư mục video có sẵn là:
  ${folderNames.map((f, i) => `${i + 1}. ${f}`).join("\n")}
  
  Hãy phân tích ý nghĩa đoạn mô tả và chọn thư mục phù hợp nhất để ghép video. 
  Chỉ trả về đúng **tên thư mục**, không kèm giải thích.
  `;

    const result = await askGemini(prompt);

    // Đảm bảo tên trả về nằm trong danh sách
    const match = folderNames.find(f => result.toLowerCase().includes(f.toLowerCase()));
    return match ?? null;
}

async function getBestFolderAndVideo(
    fileTree: FileTree[],
    text: string,
    keywords: string[],
    start: number,
    end: number,
    usedVideos: Set<string>
): Promise<VideoSelection[] | null> {
    const allFolders = extractAllFolders(fileTree);
    const flattened = flattenFileTree(fileTree, process.env.ROOT_DIR || "videos");

    const bestFolder = await selectBestFolderWithGemini(allFolders, text, keywords);
    if (!bestFolder) return null;

    const folderMatch = flattened.find(f => f.folder.endsWith(bestFolder));
    if (!folderMatch || folderMatch.files.length === 0) return null;

    const selected: VideoSelection[] = [];
    const used = new Set<string>();
    let timeStart = start * 1_000_000; // microseconds

    let availableVideos = folderMatch.files;
    if (process.env.VIDEO_UNIQUE_FLAG === "true") {
        availableVideos = folderMatch.files.filter(file => {
            const key = `${folderMatch.folder}/${file.name}`;
            return !usedVideos.has(key);
        });

        if (availableVideos.length === 0) return null;
    }

    // Shuffle video list to randomize selection order
    const shuffled = [...availableVideos].sort(() => Math.random() - 0.5);

    for (const file of shuffled) {
        if (used.has(file.name)) continue;

        const timeEnd = Math.min(timeStart + file.duration, end * 1_000_000);
        selected.push({ folder: folderMatch.folder, video: file.name, start: timeStart, end: timeEnd });
        used.add(file.name);
        timeStart += file.duration;
        if (timeStart > end * 1_000_000) break;
    }

    return timeStart > end * 1_000_000 ? selected : null;
}

export { getBestFolderAndVideo };