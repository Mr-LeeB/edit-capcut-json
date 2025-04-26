import { askGemini } from "~/bot/gemini";
import extractAllFolders from "~/libs/extractAllFolders";
import flattenFileTree from "~/libs/flattenFileTree";
import { FileTree } from "~/types";

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
    keywords: string[]
): Promise<{ folder: string; video: string } | null> {
    const allFolders = extractAllFolders(fileTree);
    const flattened = flattenFileTree(fileTree);

    const bestFolder = await selectBestFolderWithGemini(allFolders, text, keywords);
    if (!bestFolder) return null;

    const folderMatch = flattened.find(f => f.folder === bestFolder);
    if (!folderMatch || folderMatch.files.length === 0) return null;

    const video = folderMatch.files[Math.floor(Math.random() * folderMatch.files.length)];
    return { folder: bestFolder, video };
}
export { getBestFolderAndVideo };