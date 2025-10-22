import { RenderElementProps } from 'slate-react';
import { AlignType } from '@/features/richtext/types/custom-types';
import { isAlignElement } from '@/features/richtext/utils/type-guards';
import { Code } from '@/features/richtext/components/element/code';
import { H1, H2 } from '@/features/richtext/components/element/heading';
import {
  BlockQuoteType,
  BulletedListType,
  CodeBlockType,
  HeadingOneType,
  HeadingTwoType,
  ListItemType,
  NumberedListType,
  TitleType,
} from '@/features/richtext/constants/node-types';

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const style: React.CSSProperties = {};
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType;
  }
  switch (element.type) {
    case CodeBlockType:
      return <Code {...props} />;
    case BlockQuoteType:
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case BulletedListType:
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case TitleType:
      return (
        <H1 style={style} {...attributes}>
          {children}
        </H1>
      );
    case HeadingOneType:
      return (
        <H1 style={style} {...attributes}>
          {children}
        </H1>
      );
    case HeadingTwoType:
      return (
        <H2 style={style} {...attributes}>
          {children}
        </H2>
      );
    case ListItemType:
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case NumberedListType:
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
