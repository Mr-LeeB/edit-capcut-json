import { FileEntry, FileTree } from "~/types";

function isFileEntry(item: FileEntry | FileTree): item is FileEntry {
  return typeof item === 'object' && 'name' in item && 'duration' in item;
}

function flattenFileTree(
  tree: FileTree[],
  rootFolderName: string
): { folder: string; files: FileEntry[] }[] {
  const result: { folder: string; files: FileEntry[] }[] = [];

  function traverse(node: FileTree, parentPath = '') {
    for (const folder in node) {
      const relativePath = folder === rootFolderName ? '' : (parentPath ? `${parentPath}/${folder}` : folder);
      const files: FileEntry[] = [];
      const children = node[folder];

      for (const item of children) {
        if (isFileEntry(item)) {
          files.push(item);
        } else {
          traverse(item, relativePath); // Gọi đệ quy với đường dẫn rút gọn
        }
      }

      if (relativePath) {
        result.push({ folder: relativePath, files });
      }
    }
  }

  for (const entry of tree) {
    traverse(entry);
  }

  return result;
}


export default flattenFileTree;  