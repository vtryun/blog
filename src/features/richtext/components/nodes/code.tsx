import { Transforms } from 'slate';
import Box from '@mui/material/Box';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
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
  RenderElementPropsFor,
  CodeBlockElement,
  CustomEditor,
  ParagraphElement,
} from '@/features/richtext/types/custom-types';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

interface LanguageSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LanguageSelect = (props: LanguageSelectProps) => {
  return (
    <select
      data-test-id="language-select"
      contentEditable={false}
      style={{
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 1,
      }}
      {...props}
    >
      <option value="css">CSS</option>
      <option value="html">HTML</option>
      <option value="java">Java</option>
      <option value="javascript">JavaScript</option>
      <option value="jsx">JSX</option>
      <option value="typescript">TypeScript</option>
      <option value="tsx">TSX</option>
      <option value="markdown">Markdown</option>
      <option value="php">PHP</option>
      <option value="python">Python</option>
      <option value="sql">SQL</option>
    </select>
  );
};

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
      console.log('copy success');
    } catch (err) {
      console.error('copy failed', err);
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
      {/* editor status */}
      {!readOnly && (
        <LanguageSelect
          value={element.language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      )}
      <Typography variant="caption" color={grey[600]} contentEditable={false}>
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
