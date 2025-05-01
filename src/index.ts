import * as dotenv from "dotenv";

import parseSRT from "./libs/parseSRT";
import readDirectoriesAndFiles from "./libs/readDirectoriesAndFiles";
import { GeminiSegment, splitSegmentsWithPreciseTiming } from "./libs/splitSegmentsWithPreciseTiming";
import analyzeContent from "./tasks/analyzeContent";
import generateJsonFile from "./tasks/generateJson";
import { getBestFolderAndVideo } from "./tasks/selectBestFolderWithGemini";
import { FolderResult } from "./types";
import { RunOptions } from "./type";

dotenv.config();

export async function runWithOptions(options: RunOptions) {
    const subtitles = parseSRT(options.SUB_FILE);
    const rootDirectory = options.ROOT_VIDEO_DIRECTORY;
    const filesAndDirectories = await readDirectoriesAndFiles(rootDirectory);

    // Gửi nội dung cho Gemini
    const fullContent = subtitles.map(s => s.text).join(" ");

    console.log('Đang phân tích nội dung...');
    const geminiSegments: GeminiSegment[] = await analyzeContent(fullContent);

    // Phân bổ thời gian chính xác
    const timedSegments = splitSegmentsWithPreciseTiming(geminiSegments, subtitles);
    const results: FolderResult[] = [];
    const usedVideos = new Set<string>();
    let index = 0;

    console.log("Đang tìm kiếm video phù hợp...");
    console.log(`Tổng số đoạn: ${timedSegments.length}`);
    for (const part of timedSegments) {
        // cứ 15 requests thì tạm dừng 1 phút
        index++;
        if (index > 0 && index % 10 === 0) {
            console.log("Tạm dừng 1 phút...");
            await new Promise(resolve => setTimeout(resolve, 60 * 1000));
        }

        const match = await getBestFolderAndVideo(filesAndDirectories, part.text, part.keywords, part.start, part.end, usedVideos);
        console.log(`Đã chọn thư mục: ${JSON.stringify(match, null, 2)}`);
        if (match) {
            for (const m of match) {
                results.push({
                    text: part.text,
                    folder: m.folder,
                    video: m.video,
                    start: m.start,
                    end: m.end
                });
                const videoKey = `${m.folder}/${m.video}`;
                usedVideos.add(videoKey);
            }
        } else {
            console.warn(`⚠️ Không tìm được video phù hợp cho đoạn: "${part.text}"`);
        }
    }
    console.log(JSON.stringify(results, null, 2));

    const draffFilePath = options.PATH_DRAFF_JSON;
    const jsonFilePath = draffFilePath;

    generateJsonFile(draffFilePath, jsonFilePath, results);
    return results;
}