'use client';

import { useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';
import { Leaf } from '@/features/richtext/components/leaf-render';
import { Element } from '@/features/richtext/components/element-render';
import { withLayout } from '../plugins/with-layout';
import { useDecorate } from '../hooks/useDecorate';
import { Stack, Box, Typography } from '@mui/material';
import { INITIAL_VALUE } from '../constants/initvalue';

export default function PostShow({ content }: { content: Descendant[] }) {
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
    <Stack
      component={Slate}
      editor={editor}
      initialValue={content || INITIAL_VALUE}
    >
      <Box
        component={Editable}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        readOnly={true}
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
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          '&:focus': { outline: 'none' },
        }}
      />
    </Stack>
  );
}
