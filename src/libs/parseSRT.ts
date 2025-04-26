import fs from "fs";

interface SubtitleLine {
    start: number; // tính bằng giây
    end: number;
    text: string;
    wordCount: number;
}

function parseSRT(filePath: string): SubtitleLine[] {
    const raw = fs.readFileSync(filePath, "utf-8");
    const blocks = raw.split(/\n\s*\n/);
    const subtitles: SubtitleLine[] = [];

    for (const block of blocks) {
        const lines = block.trim().split("\n");
        if (lines.length >= 2) {
            const timing = lines[1];
            const [startStr, endStr] = timing.split("-->").map(t => t.trim());
            const start = parseTime(startStr);
            const end = parseTime(endStr);
            const text = lines.slice(2).join(" ").replace(/^\d+\s*/, "").trim();
            if (text.length > 0) {
                const wordCount = text.split(/\s+/).length;
                subtitles.push({ start, end, text, wordCount });
            }
        }
    }
    return subtitles;
}

function parseTime(timeStr: string): number {
    const [h, m, rest] = timeStr.split(":");
    const [s, ms] = rest.split(",");
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;
}


export default parseSRT;