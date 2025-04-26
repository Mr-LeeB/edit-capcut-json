export type FileTree = { [folder: string]: (string | FileTree)[] };

export type FolderResult = { text: string; folder: string; video: string, start: number; end: number };