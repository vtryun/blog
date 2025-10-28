'use client';

import { INITIAL_VALUE } from '@/features/richtext/constants/initvalue';
import Box from '@mui/material/Box';
import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
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
import Toolbar from '@/features/richtext/components/toolbar';
import { useDecorate } from '@/features/richtext/hooks/useDecorate';
import { withLayout } from '@/features/richtext/plugins/with-layout';
import Stack from '@mui/material/Stack';
import { createPost } from '@/features/richtext/actions/create-post';
import { editPost } from '@/features/richtext/actions/edit-post';
import { useSnackbar } from '@/share/hooks/use-snackbar';
import { useClickOutsideBlock } from '../hooks/useClickOutsideBlock';
import { selectedBlockAtom } from '../store/editor-store';
import { useSetAtom } from 'jotai';
import RichtextEditorSetting from './richtext-setting';

interface RichtextEditorProps {
  mode: 'create' | 'edit';
  slug?: string;
  title?: string;
  content?: Descendant[] | null;
  categoryName?: string;
  tagNames?: string[];
  status?: 'DRAFT' | 'PUBLISHED';
}

export default function RichtextEditor({
  mode,
  slug,
  title = '',
  categoryName = '',
  tagNames = [],
  content = INITIAL_VALUE,
  status = 'PUBLISHED',
}: RichtextEditorProps) {
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );

  const decorate = useDecorate();
  const setSelectedBlock = useSetAtom(selectedBlockAtom);
  useClickOutsideBlock(
    editor,
    () => {
      console.log('now:null');
      setSelectedBlock(null);
    },
    ['block-setting-area']
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  return (
    <Stack direction="row" justifyContent="space-between" height="100%" gap={2}>
      <Slate editor={editor} initialValue={content || INITIAL_VALUE}>
        <Stack flex={1} p={2}>
          <Toolbar />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            spellCheck={false}
            autoFocus
            placeholder="Enter a title…"
            style={{
              flex: 1,
              padding: 16,
              outline: 'none',
              border: `1px solid rgb(0 0 0 / 0.12)`,
            }}
          />
        </Stack>
        <Box id="block-setting-area">
          <Box sx={{ width: 400, p: 2, position: 'sticky', top: 0 }}>
            <RichtextEditorSetting />
          </Box>
        </Box>
      </Slate>
    </Stack>
  );
}
