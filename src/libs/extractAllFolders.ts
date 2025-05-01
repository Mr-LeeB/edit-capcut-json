import { FileEntry, FileTree } from "~/types";


function isFileEntry(item: FileEntry | FileTree): item is FileEntry {
  return typeof item === 'object' && 'name' in item && 'duration' in item;
}

export default function extractAllFolders(tree: FileTree[]): string[] {
  const folders: string[] = [];

  function traverse(node: FileTree) {
    for (const folder in node) {
      folders.push(folder);
      const children = node[folder];

      for (const item of children) {
        if (!isFileEntry(item)) {
          traverse(item);
        }
      }
    }
  }

  for (const entry of tree) {
    traverse(entry);
  }

  return folders;
}

