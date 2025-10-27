'use client';

import { useMemo, useCallback } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';
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
import { withLayout } from '@/features/richtext/plugins/with-layout';
import { useDecorate } from '@/features/richtext/hooks/useDecorate';
import { Stack, Box, Typography } from '@mui/material';
import { INITIAL_VALUE } from '@/features/richtext/constants/initvalue';
import { CODE_BLOCK_TYPE, HEADING_SIX_TYPE } from '@/features/richtext/constants/node-types';

export default function PostShow({
  content = INITIAL_VALUE,
  mode = 'user',
}: {
  content?: unknown;
  mode?: 'user' | 'anthor';
}) {
  const safeContent = useMemo(() => {
    if (Array.isArray(content)) {
      return content as Descendant[];
    }
    return INITIAL_VALUE;
  }, [content]);

  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );

  let initValue: Descendant[];

  if (mode === 'anthor') {
    // anthor mode don't show code
    const filteredContent = safeContent.filter(
      (node) => node.type !== CODE_BLOCK_TYPE
    );

    // change title h1 to h6
    const titleNode = filteredContent[0]
      ? { ...filteredContent[0], type: HEADING_SIX_TYPE }
      : { type: HEADING_SIX_TYPE, children: [{ text: 'Untitled' }] };

    // anthor mode only show ten lines
    const restNodes = filteredContent.slice(1, 10);

    initValue = [titleNode, ...restNodes];
  } else {
    initValue = safeContent;
  }

  const decorate = useDecorate();
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  // console.log(titleNode);

  return (
    <Stack component={Slate} editor={editor} initialValue={initValue}>
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
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          '&:focus': { outline: 'none' },
        }}
      />
    </Stack>
  );
}
