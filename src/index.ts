import * as dotenv from "dotenv";

import parseSRT from "./libs/parseSRT";
import readDirectoriesAndFiles from "./libs/readDirectoriesAndFiles";
import { GeminiSegment, splitSegmentsWithPreciseTiming } from "./libs/splitSegmentsWithPreciseTiming";
import analyzeContent from "./tasks/analyzeContent";
import generateJsonFile from "./tasks/generateJson";
import { getBestFolderAndVideo } from "./tasks/selectBestFolderWithGemini";
import { FolderResult } from "./types";

dotenv.config();

async function run() {
    const subtitles = parseSRT(process.env.SUB_FILE || "D:/Kien/Sub video.srt");
    const rootDirectory = process.env.ROOT_VIDEO_DIRECTORY || "D:/Kien/videos";
    const filesAndDirectories = readDirectoriesAndFiles(rootDirectory);

    // Gửi nội dung cho Gemini
    const fullContent = subtitles.map(s => s.text).join(" ");
    const geminiSegments: GeminiSegment[] = await analyzeContent(fullContent);

    // Phân bổ thời gian chính xác
    const timedSegments = splitSegmentsWithPreciseTiming(geminiSegments, subtitles);
    const results: FolderResult[] = [];
    for (const part of timedSegments) {
        const match = await getBestFolderAndVideo(filesAndDirectories, part.text, part.keywords);
        console.log(`Đã chọn thư mục: ${JSON.stringify(match, null, 2)}`);
        if (match) {
            results.push({ text: part.text, folder: match.folder, video: match.video, start: part.start, end: part.end });
        } else {
            console.warn(`⚠️ Không tìm được video phù hợp cho đoạn: "${part.text}"`);
        }
    }
    console.log(JSON.stringify(results, null, 2));

    const draffFilePath = process.env.PATH_DRAFF_JSON || "C:/Users/Admin/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft/test/draft_content.json";
    const jsonFilePath = draffFilePath;

    generateJsonFile(draffFilePath, jsonFilePath, results);
    
}

run();