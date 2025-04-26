import { FileTree } from "~/types";

export default function extractAllFolders(tree: FileTree[]): string[] {
  const folders: string[] = [];

  function traverse(node: FileTree) {
    for (const folder in node) {
      folders.push(folder);
      const children = node[folder];

      for (const item of children) {
        if (typeof item !== "string") {
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

