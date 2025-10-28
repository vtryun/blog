import { Descendant, BaseEditor, BaseRange, Range, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import {
  type TEXT_ALIGN_TYPES,
  type LIST_TYPES,
  type HEADING_TYPES
} from '@/features/editor/constants'
import { AlertProps } from '@mui/material'
import {
  BLOCK_QUOTE_TYPE,
  BULLETED_LIST_TYPE,
  CHECK_LIST_ITEM_TYPE,
  EDITABLE_VOID_TYPE,
  HEADING_ONE_TYPE,
  HEADING_TWO_TYPE,
  HEADING_THREE_TYPE,
  HEADING_FOUR_TYPE,
  HEADING_FIVE_TYPE,
  HEADING_SIX_TYPE,
  IMAGE_TYPE,
  DIVIDER_TYPE,
  ALERT_TYPE,
  CODE_BLOCK_TYPE,
  CODE_LINE_TYPE,
  LINK_TYPE,
  BUTTON_TYPE,
  BADGE_TYPE,
  LIST_ITEM_TYPE,
  NUMBERED_LIST_TYPE,
  MENTION_TYPE,
  TABLE_TYPE,
  TABLE_ROW_TYPE,
  TABLE_CELL_TYPE,
  TITLE_TYPE,
  VIDEO_TYPE,
  PARAGRAPH_TYPE
} from '@/features/richtext/constants/node-types'

type AlignType = (typeof TEXT_ALIGN_TYPES)[number]
type ListType = (typeof LIST_TYPES)[number]
type headingType = (typeof HEADING_TYPES)[number]
type CustomElementFormat = CustomElementType | AlignType | ListType

export type BlockQuoteElement = {
  type: typeof BLOCK_QUOTE_TYPE
  align?: string
  children: Descendant[]
}

export type BulletedListElement = {
  type: typeof BULLETED_LIST_TYPE
  align?: string
  children: Descendant[]
}

export type CheckListItemElement = {
  type: typeof CHECK_LIST_ITEM_TYPE
  checked: boolean
  children: Descendant[]
}

export type EditableVoidElement = {
  type: typeof EDITABLE_VOID_TYPE
  children: EmptyText[]
}

// ==========================
// Heading
// ==========================
export type HeadingElement = {
  type:
  | typeof HEADING_ONE_TYPE
  | typeof HEADING_TWO_TYPE
  | typeof HEADING_THREE_TYPE
  | typeof HEADING_FOUR_TYPE
  | typeof HEADING_FIVE_TYPE
  | typeof HEADING_SIX_TYPE
  align?: AlignType
  children: Descendant[]
}

export type ImageElement = {
  type: typeof IMAGE_TYPE
  url: string
  children: EmptyText[]
}

export type VideoElement = {
  type: typeof VIDEO_TYPE
  url: string
  children: EmptyText[]
}

export type DividerElement = {
  type: typeof DIVIDER_TYPE
  children: EmptyText[]
}

export type AlertBlockElement = {
  type: typeof ALERT_TYPE
  severity: AlertProps['severity']
  children: Descendant[]
}

export type CheckListItemElement = {
  type: typeof CHECK_LIST_ITEM_TYPE
  checked: boolean
  children: Descendant[]
}

export type CodeBlockElement = {
  type: typeof CODE_BLOCK_TYPE
  language: string
  children: Descendant[]
}

export type CodeLineElement = {
  type: typeof CODE_LINE_TYPE
  children: Descendant[]
}

export type LinkElement = {
  type: typeof LINK_TYPE
  url: string
  children: Descendant[]
}

export type ButtonElement = { type: typeof BUTTON_TYPE; children: Descendant[] }

export type BadgeElement = { type: typeof BADGE_TYPE; children: Descendant[] }

export type ListItemElement = {
  type: typeof LIST_ITEM_TYPE
  children: Descendant[]
}

export type NumberedListElement = {
  type: typeof NUMBERED_LIST_TYPE
  children: Descendant[]
}

export type MentionElement = {
  type: typeof MENTION_TYPE
  character: string
  children: CustomText[]
}

export type ParagraphElement = {
  type: typeof PARAGRAPH_TYPE
  align?: string
  children: Descendant[]
}

// ==========================
// Table
// ==========================
export type TableCellElement = {
  type: typeof TABLE_CELL_TYPE
  children: CustomText[]
}

export type TableRowElement = {
  type: typeof TABLE_ROW_TYPE
  children: TableCellElement[]
}

export type TableElement = {
  type: typeof TABLE_TYPE
  children: TableRowElement[]
}

// ==========================
// title
// ==========================
export type TitleElement = { type: typeof TITLE_TYPE; children: Descendant[] }

export type CustomElementWithAlign =
  | ParagraphElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | HeadingFourElement
  | HeadingFiveElement
  | HeadingSixElement
  | BlockQuoteElement
  | BulletedListElement

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | HeadingFourElement
  | HeadingFiveElement
  | HeadingSixElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | ListItemElement
  | NumberedListItemElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | CodeLineElement
  | DividerElement
  | AlertElement
  | CheckListItemElement
  | CodeElement

export type CustomElementType = CustomElement['type']

export type CustomText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
  strikethrough?: boolean
  // MARKDOWN PREVIEW SPECIFIC LEAF
  underlined?: boolean
  title?: boolean
  list?: boolean
  hr?: boolean
  blockquote?: boolean
  href?: string
  text: string
}

export type CustomTextKey = keyof Omit<CustomText, 'text'>

export type EmptyText = {
  text: string
}

export type RenderElementPropsFor<T> = RenderElementProps & {
  element: T
}

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
  }

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
    Range: BaseRange & {
      [key: string]: unknown
    }
  }
}