import { Editor, Element as SlateElement } from "slate"
import { TEXT_ALIGN_TYPES, LIST_TYPES, HEADING_TYPES } from "@/features/richtext/constants/types"
import {
  CustomElementFormat,
  AlignType,
  ListType,
  headingType,
  CustomElement,
  CustomElementWithAlign,
  CustomEditor,
  CustomTextKey
} from "@/features/richtext/types/custom-types"

export const isAlignType = (format: CustomElementFormat): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType)
}

export const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType)
}

export const isHeadingType = (format: CustomElementFormat): format is headingType => {
  return HEADING_TYPES.includes(format as headingType)
}

export const isAlignElement = (
  element: CustomElement
): element is CustomElementWithAlign => {
  return 'align' in element
}

export const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: 'type' | 'align' = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === 'align' && isAlignElement(n)) {
            return n.align === format
          }
          return n.type === format
        }
        return false
      },
    })
  )

  return !!match
}

export const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor);
  
  if (!marks) return false;

  if (format === 'href') {
    return Object.hasOwn(marks, 'href');
  }

  return marks[format] === true;
};