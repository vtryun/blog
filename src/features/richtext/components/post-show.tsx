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
import { withLayout } from '../plugins/with-layout';
import { useDecorate } from '../hooks/useDecorate';
import { Stack, Box, Typography } from '@mui/material';
import { INITIAL_VALUE } from '../constants/initvalue';
import { CODE_BLOCK_TYPE, HEADING_FOUR_TYPE } from '../constants/node-types';

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

    // change title h1 to h4
    const titleNode = safeContent[0]
      ? { ...safeContent[0], type: HEADING_FOUR_TYPE }
      : { type: HEADING_FOUR_TYPE, children: [{ text: 'Untitled' }] };
    const restNodes = safeContent.slice(1, 10);

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
