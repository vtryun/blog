import { Editor, NodeEntry, Element as SlateElement, Transforms } from 'slate';
import {
  CustomEditor,
  ParagraphElement,
} from '@/features/richtext/types/custom-types';

// A Slate.js plugin to ensure the editor always ends with a paragraph node
export const withLayout = (editor: CustomEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry: NodeEntry) => {
    const [node, path] = entry;

    if (Editor.isEditor(node)) {
      const lastIndex = node.children.length - 1;
      const lastNode = node.children[lastIndex];

      if (
        node.children.length === 0 ||
        !SlateElement.isElement(lastNode) ||
        lastNode.type !== 'paragraph'
      ) {
        const paragraph: ParagraphElement = {
          type: 'paragraph',
          children: [{ text: '' }],
        };

        Transforms.insertNodes(editor, paragraph, {
          at: [node.children.length],
        });
        console.log('Inserted missing paragraph at the end');
        return;
      }
    }

    return normalizeNode(entry);
  };

  return editor;
};
