export type FileEntry = {
    name: string;
    duration: number;
};
export type FileTree = {
    [folder: string]: (FileEntry | FileTree)[]
};

export type FolderResult = {
    text: string;
    folder: string;
    video: string,
    start: number;
    end: number
};

export type VideoSelection = {
    folder: string;
    video: string;
    start: number;
    end: number;
};