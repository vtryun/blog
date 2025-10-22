import {
  BULLETED_LIST_TYPE,
  HEADING_FIVE_TYPE,
  HEADING_FOUR_TYPE,
  HEADING_ONE_TYPE,
  HEADING_SIX_TYPE,
  HEADING_THREE_TYPE,
  HEADING_TWO_TYPE,
  NUMBERED_LIST_TYPE
} from "./node-types";

// Group exports for convenience
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;
export const LIST_TYPES = [BULLETED_LIST_TYPE, NUMBERED_LIST_TYPE] as const;
export const HEADING_TYPES = [
  HEADING_ONE_TYPE,
  HEADING_TWO_TYPE,
  HEADING_THREE_TYPE,
  HEADING_FOUR_TYPE,
  HEADING_FIVE_TYPE,
  HEADING_SIX_TYPE,
] as const;