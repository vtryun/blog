'use client';

import { INITIAL_VALUE } from '@/features/richtext/constants/initvalue';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState, type MouseEvent } from 'react';
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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import slugify from 'slugify';
import { createPost } from '@/features/richtext/actions/create-post';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useSnackbar } from '@/share/hooks/use-snackbar';

export default function EditorPage() {
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );

  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const { showSnackbar } = useSnackbar();
  const decorate = useDecorate();
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  async function handleSubmit() {
    if (!editor) {
      console.warn('Editor is not initialized');
      return;
    }
    const title = editor.children[0].children[0].text;
    console.log({
      title,
      slug: slugify(title),
      status,
      content: editor.children,
    });
    try {
      await createPost({ title, content: editor.children });
      showSnackbar('post created successfully', 'success')
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        showSnackbar(String(error), 'error');
      }
    }
  }

  return (
    <Box>
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
      <Stack>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            aria-labelledby="status-radio-group-label"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
          >
            <FormControlLabel value="DRAFT" control={<Radio />} label="draft" />
            <FormControlLabel
              value="PUBLISHED"
              control={<Radio />}
              label="public"
            />
          </RadioGroup>
        </FormControl>
        <Button onClick={handleSubmit} sx={{ textTransform: 'none', mt: 2 }}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
