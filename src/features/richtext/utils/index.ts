import { Editor, Node, Text } from 'slate'

// at least, have any text is not equal to ''
export function isEditorContentNotEmpty(editor: Editor): boolean {
  for (const [node] of Node.descendants(editor)) {
    if (Text.isText(node) && node.text.trim() !== '') {
      return true
    }
  }
  return false
}
