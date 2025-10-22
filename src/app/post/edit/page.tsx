'use client';

import { INITIAL_VALUE } from '@/features/richtext/constants/initvalue';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  withReact,
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import { Element } from '@/features/richtext/components/element-render';
import { Leaf } from '@/features/richtext/components/leaf-render';
import { grey } from '@mui/material/colors';
import Toolbar from '@/features/richtext/components/toolbar';
import { useDecorate } from '@/features/richtext/hooks/useDecorate';
import { withLayout } from '@/features/richtext/plugins/with-layout';

export default function EditorPage() {
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );

  const decorate = useDecorate();
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  return (
    <Box component={Slate} editor={editor} initialValue={INITIAL_VALUE}>
      <Toolbar />
      <Box
        component={Editable}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        spellCheck={false}
        autoFocus
        placeholder="Enter a title…"
        renderPlaceholder={({ attributes, children }) => (
          <Typography component="span" {...attributes} sx={{ pt: 4 }}>
            {children}
          </Typography>
        )}
        sx={{
          minHeight: '100% !important',
          py: 2,
          bgcolor: grey[100],
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          '&:focus': { outline: 'none' },
        }}
      />
    </Box>
  );
}
