'use client';

import { Transforms } from 'slate';
import Box from '@mui/material/Box';
import { useEffect, useMemo, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ReactEditor, useSlateStatic } from 'slate-react';
import Prism from 'prismjs';
import '@/share/styles/global.css';
import '@/features/richtext/styles/prism-default.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
import { grey } from '@mui/material/colors';
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import {
  RenderElementPropsFor,
  CodeBlockElement,
  CustomEditor,
  ParagraphElement,
} from '@/features/richtext/types/custom-types';
import { LANGUAGES } from '@/features/richtext/constants/languages';

export function Code(props: RenderElementPropsFor<CodeBlockElement>) {
  const { element, attributes, children, onClick } = props;
  const p = Prism;
  const editor = useSlateStatic();
  const readOnly = ReactEditor.isReadOnly(editor);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    Prism.highlightAll();
  }, []);

  const text = useMemo(() => {
    try {
      return element.children
        .map((line: any) =>
          line.children.map((item: any) => item.text).join('')
        )
        .join('\n');
    } catch {
      return '';
    }
  }, [element.children]);

  if (!isClient) {
    return <div {...attributes} />;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log('chenggong');
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const setLanguage = (language: string) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { language }, { at: path });
  };

  return (
    <Box
      component="pre"
      {...attributes}
      onClick={readOnly ? null : onClick}
      spellCheck={false}
      sx={{
        position: 'relative',
        borderRadius: 2,
        overflow: 'visible',
        bgcolor: '#f8f8f8',
        p: 2,
      }}
    >
      {/* select code language */}
      {!readOnly && (
        <Select
          labelId="code-language-select-label"
          id="code-language-select"
          value={element.language || 'plaintext'}
          label="Language"
          onChange={(event: SelectChangeEvent) =>
            setLanguage(event.target.value as string)
          }
          renderValue={(value) => {
            const lang = LANGUAGES.find((l) => l.value === value);
            return (
              <Stack direction="row" alignItems="center" spacing={1}>
                {lang && (
                  <Box
                    component="img"
                    src={lang.icon}
                    alt={lang.label}
                    sx={{ width: 22, height: 22 }}
                  />
                )}
                <Typography>{lang?.label ?? value}</Typography>
              </Stack>
            );
          }}
        >
          {LANGUAGES.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={lang.icon}
                  alt={lang.label}
                  sx={{ width: 22, height: 22 }}
                />
                <Typography>{lang.label}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      )}

      <Typography variant="caption" color={grey[600]}>
        {element.language}
      </Typography>

      {/* copy button */}
      {readOnly && (
        <Box sx={{ position: 'sticky', top: 40, zIndex: 9999 }}>
          <Box sx={{ position: 'absolute', bottom: 0, insetInlineEnd: 0 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              sx={{
                color: grey[400],
              }}
            >
              {copied ? (
                <CheckIcon fontSize="small" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>
      )}

      <code
        className={`language-${element.language}`}
        style={{ pointerEvents: 'auto', whiteSpace: 'pre' }}
      >
        {children}
      </code>
    </Box>
  );
}

export const insertCode = (editor: CustomEditor) => {
  console.log('added: code-block');

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
