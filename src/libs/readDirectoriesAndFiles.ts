import * as fs from 'fs';
import * as path from 'path';
import ffmpeg from 'fluent-ffmpeg';

import { FileTree } from '~/types';


async function readDirectoriesAndFiles(dirPath: string): Promise<FileTree[]> {
    const result: FileTree[] = [];

    const items = fs.readdirSync(dirPath);
    const currentFolder: FileTree = {};
    const folderName = path.basename(dirPath);
    currentFolder[folderName] = [];

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            const subTree = await readDirectoriesAndFiles(fullPath);
            currentFolder[folderName].push(...subTree);
        } else if (item.endsWith('.mp4')) {
            const duration = await getVideoDuration(fullPath);
            currentFolder[folderName].push({
                name: item,
                duration
            });
        }
    }

    result.push(currentFolder);
    return result;
}

function getVideoDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) return reject(err);
            const durationInSec = metadata.format.duration || 0;
            resolve(Math.floor(durationInSec * 1_000_000)); // microseconds
        });
    });
}

export default readDirectoriesAndFiles;