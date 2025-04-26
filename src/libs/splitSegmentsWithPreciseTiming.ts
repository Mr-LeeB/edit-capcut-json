interface GeminiSegment {
    text: string;
    keywords: string[];
}

interface TimedSegment extends GeminiSegment {
    start: number;
    end: number;
}

interface SubtitleLine {
    start: number; // tính bằng giây
    end: number;
    text: string;
    wordCount: number;
}

function splitSegmentsWithPreciseTiming(segments: GeminiSegment[], subtitles: SubtitleLine[]): TimedSegment[] {
    let subtitleIndex = 0;
    let subtitleOffsetWords = 0;

    const result: TimedSegment[] = [];

    for (const seg of segments) {
        const totalSegWords = seg.text.split(/\s+/).length;
        let collectedWords = 0;
        let startTime = 0;
        let endTime = 0;
        let firstWordInSegment = true;

        while (collectedWords < totalSegWords && subtitleIndex < subtitles.length) {
            const subtitle = subtitles[subtitleIndex];
            const subtitleDuration = subtitle.end - subtitle.start;
            const remainingSubtitleWords = subtitle.wordCount - subtitleOffsetWords;

            if (firstWordInSegment) {
                const wordRate = subtitleDuration / subtitle.wordCount;
                startTime = subtitle.start + wordRate * subtitleOffsetWords;
                firstWordInSegment = false;
            }

            if (totalSegWords - collectedWords < remainingSubtitleWords) {
                const wordRate = subtitleDuration / subtitle.wordCount;
                endTime = subtitle.start + wordRate * (subtitleOffsetWords + (totalSegWords - collectedWords));
                subtitleOffsetWords += (totalSegWords - collectedWords);
                collectedWords = totalSegWords;
            } else {
                collectedWords += remainingSubtitleWords;
                subtitleIndex++;
                subtitleOffsetWords = 0;
                endTime = subtitle.end;
            }
        }

        result.push({
            ...seg,
            start: parseFloat(startTime.toFixed(3)),
            end: parseFloat(endTime.toFixed(3))
        });
    }

    return result;
}



export { splitSegmentsWithPreciseTiming, GeminiSegment, TimedSegment };