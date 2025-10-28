'use client';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSnackbar } from '@/share/hooks/use-snackbar';
import { useState } from 'react';
import { createPost } from '../../actions/create-post';
import { editPost } from '../../actions/edit-post';
import { CustomEditor } from '../../types/custom-types';
import { useSlateStatic } from 'slate-react';

interface MainSettingProps {
  mode: 'create' | 'edit';
  slug?: string;
  title?: string;
  categoryName?: string;
  tagNames?: string[];
  status?: 'DRAFT' | 'PUBLISHED';
}

export default function MainSetting({
  mode,
  slug,
  title = '',
  categoryName = '',
  tagNames = [],
  status: initialStatus = 'PUBLISHED',
}: MainSettingProps) {
  const editor = useSlateStatic();
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>(initialStatus);
  const [category, setCategory] = useState(categoryName);
  const [tags, setTags] = useState(tagNames.join(','));
  const { showSnackbar } = useSnackbar();

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
    <Stack justifyContent="center" gap={2}>
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
          onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
        >
          <FormControlLabel value="DRAFT" control={<Radio />} label="Draft" />
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
  );
}
