'use client';

import { INITIAL_VALUE } from '@/features/richtext/constants/initvalue';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import Button from '@mui/material/Button';
import { createPost } from '@/features/richtext/actions/create-post';
import { editPost } from '@/features/richtext/actions/edit-post';
import { useSnackbar } from '@/share/hooks/use-snackbar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

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
  content = INITIAL_VALUE,
  categoryName = '',
  tagNames = [],
  status: initialStatus = 'PUBLISHED',
}: RichtextEditorProps) {
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );
  const { showSnackbar } = useSnackbar();

  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>(initialStatus);
  const [category, setCategory] = useState(categoryName);
  const [tags, setTags] = useState(tagNames.join(','));
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
    const titleText =
      typeof editor.children?.[0]?.children?.[0]?.text === 'string'
        ? editor.children[0].children[0].text
        : title;

    try {
      if (mode === 'edit') {
        await editPost({
          title: titleText,
          content: editor.children,
          slug,
          status,
          categoryName: category,
          tagNames: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        });
        showSnackbar('Post updated successfully', 'success');
      } else {
        await createPost({
          title: titleText,
          content: editor.children,
          status,
          categoryName: category,
          tagNames: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        });
        showSnackbar('Post created successfully 🎉', 'success');
      }
    } catch (error) {
      console.error(error);
      showSnackbar(String(error), 'error');
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: '100%',
        gap: 4,
      }}
    >
      <Box sx={{ flex: 1, p: 2 }}>
        <Box
          component={Slate}
          editor={editor}
          initialValue={content || INITIAL_VALUE}
        >
          <Toolbar />
          <Box
            component={Editable}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            spellCheck={false}
            autoFocus
            placeholder="Enter a title…"
            sx={{
              minHeight: '100% !important',
              p: 2,
              bgcolor: 'white',
              border: '1px solid #ddd',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              '&:focus': { outline: 'none' },
            }}
          />
        </Box>
      </Box>

      <Box>
        <Stack
          justifyContent="center"
          gap={2}
          sx={{ width: 400, p: 2, position: 'sticky', top: 0 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {mode === 'edit' ? 'Edit Post' : 'Create Post'}
          </Typography>

          <TextField
            id="category"
            label="Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <TextField
            id="tags"
            label="Tags (comma separated)"
            variant="outlined"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              name="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')
              }
            >
              <FormControlLabel
                value="DRAFT"
                control={<Radio />}
                label="Draft"
              />
              <FormControlLabel
                value="PUBLISHED"
                control={<Radio />}
                label="Published"
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ textTransform: 'none', mt: 2 }}
          >
            {mode === 'edit' ? 'Update Post' : 'Create Post'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
