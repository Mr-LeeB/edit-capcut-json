import { FileTree } from "~/types";

function flattenFileTree(tree: FileTree[]): { folder: string; files: string[] }[] {
    const result: { folder: string; files: string[] }[] = [];
  
    function traverse(node: FileTree) {
      for (const folder in node) {
        const files: string[] = [];
        const children = node[folder];
  
        for (const item of children) {
          if (typeof item === 'string') {
            files.push(item);
          } else {
            traverse(item); // ✅ Gọi đệ quy nhưng không push kết quả
          }
        }
  
        result.push({ folder, files }); // ✅ Thêm folder sau khi duyệt xong
      }
    }
  
    for (const entry of tree) {
      traverse(entry);
    }
  
    return result;
  }
export default flattenFileTree;  