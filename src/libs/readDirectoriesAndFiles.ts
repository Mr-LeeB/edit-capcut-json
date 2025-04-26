import * as fs from 'fs';
import * as path from 'path';
import { FileTree } from '~/types';


function readDirectoriesAndFiles(dirPath: string): FileTree[] {
    const result: FileTree[] = [];

    const items = fs.readdirSync(dirPath);

    const currentFolder: { [folderName: string]: (string | FileTree)[] } = {};
    const folderName = path.basename(dirPath);
    currentFolder[folderName] = [];

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            const subTree = readDirectoriesAndFiles(fullPath); // đệ quy
            currentFolder[folderName].push(...subTree);
        } else {
            currentFolder[folderName].push(item);
        }
    }

    result.push(currentFolder);
    return result;
}

export default readDirectoriesAndFiles;