import { RenderElementProps } from 'slate-react';
import { AlignType } from '@/features/richtext/types/custom-types';
import { isAlignElement } from '@/features/richtext/utils/type-guards';
import { Code } from '@/features/richtext/components/nodes/code';
import { H1, H2, H3, H4, H5, H6 } from '@/features/richtext/components/nodes/heading';
import {
  ALERT_TYPE,
  BLOCK_QUOTE_TYPE,
  BULLETED_LIST_TYPE,
  CODE_BLOCK_TYPE,
  HEADING_FIVE_TYPE,
  HEADING_FOUR_TYPE,
  HEADING_ONE_TYPE,
  HEADING_SIX_TYPE,
  HEADING_THREE_TYPE,
  HEADING_TWO_TYPE,
  LIST_ITEM_TYPE,
  NUMBERED_LIST_TYPE,
  TITLE_TYPE,
} from '@/features/richtext/constants/node-types';
import { Alert } from './nodes/alert';

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const style: React.CSSProperties = {};
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType;
  }
  switch (element.type) {
    case CODE_BLOCK_TYPE:
      return <Code {...props} />;
    case ALERT_TYPE:
      return <Alert {...props} />;
    case BLOCK_QUOTE_TYPE:
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case BULLETED_LIST_TYPE:
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case TITLE_TYPE:
      return (
        <H1 style={style} {...attributes}>
          {children}
        </H1>
      );
    case HEADING_ONE_TYPE:
      return (
        <H1 style={style} {...attributes}>
          {children}
        </H1>
      );
    case HEADING_TWO_TYPE:
      return (
        <H2 style={style} {...attributes}>
          {children}
        </H2>
      );
    case HEADING_THREE_TYPE:
      return (
        <H3 style={style} {...attributes}>
          {children}
        </H3>
      );
    case HEADING_FOUR_TYPE:
      return (
        <H4 style={style} {...attributes}>
          {children}
        </H4>
      );
    case HEADING_FIVE_TYPE:
      return (
        <H5 style={style} {...attributes}>
          {children}
        </H5>
      );
    case HEADING_SIX_TYPE:
      return (
        <H6 style={style} {...attributes}>
          {children}
        </H6>
      );
    case LIST_ITEM_TYPE:
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case NUMBERED_LIST_TYPE:
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
