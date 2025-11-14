import React, { PointerEvent } from 'react';
import Box from '@mui/material/Box';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import LooksTwo from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import FormatQuote from '@mui/icons-material/FormatQuote';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeft from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenter from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRight from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustify from '@mui/icons-material/FormatAlignJustify';
import CodeIcon from '@mui/icons-material/Code';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {
  CustomEditor,
  CustomElementFormat,
  CustomTextKey,
} from '@/features/richtext/types/custom-types';
import { useSlate } from 'slate-react';
import { toggleBlock, toggleMark } from '@/features/richtext/utils/toggle';
import IconButton from '@mui/material/IconButton';
import {
  ALERT_TYPE,
  BLOCK_QUOTE_TYPE,
  BULLETED_LIST_TYPE,
  CODE_BLOCK_TYPE,
  DIVIDER_TYPE,
  HEADING_ONE_TYPE,
  HEADING_THREE_TYPE,
  HEADING_TWO_TYPE,
  NUMBERED_LIST_TYPE,
} from '@/features/richtext/constants/node-types';
import Tooltip from '@mui/material/Tooltip';
import { insertCode } from './nodes/code';
import { insertAlert } from './nodes/alert';
import { insertDivider } from './nodes/divider';
import { insertBlocoquote } from './nodes/blockquote';
import Divider from '@mui/material/Divider';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

interface MarkButtonProps {
  format: CustomTextKey;
  icon: React.ReactNode;
}

const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();

  return (
    <Tooltip title={format}>
      <IconButton
        onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
          event.preventDefault()
        }
        onClick={() => toggleMark(editor, format)}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

interface BlockButtonProps {
  format: CustomElementFormat;
  icon: React.ReactNode;
}

const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();

  return (
    <Tooltip title={format}>
      <IconButton
        onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
          event.preventDefault()
        }
        onClick={() => {
          console.log(format), toggleBlock(editor, format);
        }}
        data-test-id={`block-button-${format}`}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

function InsertButton({
  format,
  icon,
  insert,
}: {
  format: string;
  icon: React.ReactNode;
  insert: (editor: CustomEditor) => void;
}) {
  const editor = useSlate();
  return (
    <Tooltip title={format}>
      <IconButton
        data-test-id={`${format}-insert-button`}
        onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
          event.preventDefault();
        }}
        onClick={() => insert(editor)}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default function Toolbar() {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, p: 1 }}>
      <MarkButton format="bold" icon={<FormatBold />} />
      <MarkButton format="italic" icon={<FormatItalic />} />
      <MarkButton format="underline" icon={<FormatUnderlined />} />
      <Divider orientation="vertical" variant="middle" flexItem />
      <BlockButton format={HEADING_TWO_TYPE} icon={<LooksTwo />} />
      <BlockButton format={HEADING_THREE_TYPE} icon={<Looks3Icon />} />
      <Divider orientation="vertical" variant="middle" flexItem />
      <BlockButton format={NUMBERED_LIST_TYPE} icon={<FormatListNumbered />} />
      <BlockButton format={BULLETED_LIST_TYPE} icon={<FormatListBulleted />} />
      <Divider orientation="vertical" variant="middle" flexItem />
      {/* <BlockButton format="left" icon={<FormatAlignLeft />} />
      <BlockButton format="center" icon={<FormatAlignCenter />} />
      <BlockButton format="right" icon={<FormatAlignRight />} />
      <BlockButton format="justify" icon={<FormatAlignJustify />} /> */}
      <InsertButton
        format={CODE_BLOCK_TYPE}
        icon={<CodeIcon />}
        insert={insertCode}
      />
      <BlockButton format={ALERT_TYPE} icon={<PriorityHighIcon />} />
      <InsertButton
        format={DIVIDER_TYPE}
        icon={<HorizontalRuleIcon />}
        insert={insertDivider}
      />
      <BlockButton format={BLOCK_QUOTE_TYPE} icon={<FormatQuote />} />
      <MarkButton format="href" icon={<InsertLinkIcon />} />
    </Box>
  );
}
