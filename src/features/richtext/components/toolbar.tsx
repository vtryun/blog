import React, { PointerEvent } from 'react';
import Box from '@mui/material/Box';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  LooksOne,
  LooksTwo,
  FormatQuote,
  FormatListNumbered,
  FormatListBulleted,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from '@mui/icons-material';
import {
  AlertBlockElement,
  CodeBlockElement,
  CustomElementFormat,
  CustomTextKey,
  ParagraphElement,
} from '@/features/richtext/types/custom-types';
import { useSlate } from 'slate-react';
import { toggleBlock, toggleMark } from '@/features/richtext/utils/toggle';
import IconButton from '@mui/material/IconButton';
import CodeIcon from '@mui/icons-material/Code';
import { Transforms } from 'slate';
import { ALERT_TYPE, PARAGRAPH_TYPE } from '../constants/node-types';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface MarkButtonProps {
  format: CustomTextKey;
  icon: React.ReactNode;
}

const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();

  return (
    <IconButton
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleMark(editor, format)}
    >
      {icon}
    </IconButton>
  );
};

interface BlockButtonProps {
  format: CustomElementFormat;
  icon: React.ReactNode;
}

const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();

  return (
    <IconButton
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleBlock(editor, format)}
      data-test-id={`block-button-${format}`}
    >
      {icon}
    </IconButton>
  );
};

const CodeBlockButton = () => {
  const editor = useSlate();

  const handleClick = () => {
    const codeBlock: CodeBlockElement = {
      type: 'code-block',
      language: 'javascript',
      children: [{ type: 'code-line', children: [{ text: '' }] }],
    };

    const paragraph: ParagraphElement = {
      type: 'paragraph',
      children: [{ text: '' }],
    };

    Transforms.insertNodes(editor, [codeBlock, paragraph]);
  };

  return (
    <IconButton
      data-test-id="code-block-button"
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
        event.preventDefault();
      }}
      onClick={handleClick}
    >
      <CodeIcon />
    </IconButton>
  );
};

const AlertBlockButton = () => {
  const editor = useSlate();

  const handleClick = () => {
    const alertBlock: AlertBlockElement = {
      type: ALERT_TYPE,
      children: [{ text: '' }],
      severity: 'success',
    };

    const paragraph: ParagraphElement = {
      type: PARAGRAPH_TYPE,
      children: [{ text: '' }],
    };

    Transforms.insertNodes(editor, [alertBlock, paragraph]);
  };

  return (
    <IconButton
      data-test-id="alert-block-button"
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
        event.preventDefault();
      }}
      onClick={handleClick}
    >
      <PriorityHighIcon />
    </IconButton>
  );
};

export default function Toolbar() {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, p: 1 }}>
      <MarkButton format="bold" icon={<FormatBold />} />
      <MarkButton format="italic" icon={<FormatItalic />} />
      <MarkButton format="underline" icon={<FormatUnderlined />} />
      {/* <MarkButton format="code" icon={<Code />} /> */}
      <BlockButton format="heading-one" icon={<LooksOne />} />
      <BlockButton format="heading-two" icon={<LooksTwo />} />
      <BlockButton format="block-quote" icon={<FormatQuote />} />
      <BlockButton format="numbered-list" icon={<FormatListNumbered />} />
      <BlockButton format="bulleted-list" icon={<FormatListBulleted />} />
      <BlockButton format="left" icon={<FormatAlignLeft />} />
      <BlockButton format="center" icon={<FormatAlignCenter />} />
      <BlockButton format="right" icon={<FormatAlignRight />} />
      <BlockButton format="justify" icon={<FormatAlignJustify />} />
      <CodeBlockButton />
      <AlertBlockButton />
    </Box>
  );
}
