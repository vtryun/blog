import { type Descendant } from "slate"
import { PARAGRAPH_TYPE, TITLE_TYPE} from "./node-types";

export const INITIAL_VALUE: Descendant[] = [
  {
    type: PARAGRAPH_TYPE,
    children: [{ text: "" }]
  }
];