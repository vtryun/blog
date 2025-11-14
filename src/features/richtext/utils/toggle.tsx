import { Editor, Transforms, Element as SlateElement } from 'slate';
import {
  CustomEditor,
  CustomTextKey,
  CustomElementFormat,
} from '@/features/richtext/types/custom-types';
import {
  isMarkActive,
  isBlockActive,
  isAlignType,
  isListType,
} from '@/features/richtext/utils/type-guards';

export const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format);

  if (format === 'href') {
    console.log(isActive);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      let result = prompt('input your href');
      Editor.addMark(editor, format, result);
      console.log('add href');
    }
  } else {
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
    console.log('change boolean');
  }
};

export const toggleBlock = (
  editor: CustomEditor,
  format: CustomElementFormat
) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? 'align' : 'type'
  );
  const isList = isListType(format);
  console.log('toggleBlock:', { format, isActive });

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
