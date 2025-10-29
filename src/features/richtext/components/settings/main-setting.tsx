'use client';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSnackbar } from '@/share/hooks/use-snackbar';
import { createPost } from '../../actions/create-post';
import { editPost } from '../../actions/edit-post';
import { useSlateStatic } from 'slate-react';
import { type MainSetting, mainSettingAtom } from '../../store/editor-store';
import { useAtom } from 'jotai';

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
}: {
  mode: 'create' | 'edit';
  slug?: string;
}) {
  // console.log(mode, slug, title, categoryName, tagNames, initialStatus);
  const editor = useSlateStatic();
  const [mainSetting, setMainSetting] = useAtom(mainSettingAtom);
  // const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>(initialStatus);
  // const [category, setCategory] = useState(categoryName);
  // const [tags, setTags] = useState(tagNames.join(','));
  const { showSnackbar } = useSnackbar();

  const updateMainSetting = <k extends keyof MainSetting>(
    field: k,
    value: MainSetting[k]
  ) => {
    setMainSetting((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit() {
    const titleText =
      typeof editor.children?.[0]?.children?.[0]?.text === 'string'
        ? editor.children[0].children[0].text
        : mainSetting.title;

    try {
      if (mode === 'edit') {
        await editPost({
          title: titleText,
          content: editor.children,
          slug,
          status: mainSetting.status,
          categoryName: mainSetting.categoryName,
          tagNames: mainSetting.tagNames
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        });
        showSnackbar('Post updated successfully', 'success');
      } else {
        await createPost({
          title: titleText,
          content: editor.children,
          status: mainSetting.status,
          categoryName: mainSetting.categoryName,
          tagNames: mainSetting.tagNames
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
      <TextField
        id="category"
        label="Category"
        variant="outlined"
        value={mainSetting.categoryName}
        onChange={(e) => updateMainSetting('categoryName', e.target.value)}
      />

      <TextField
        id="tags"
        label="Tags (comma separated)"
        variant="outlined"
        value={mainSetting.tagNames}
        onChange={(e) => updateMainSetting('tagNames', e.target.value)}
      />

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          name="status"
          value={mainSetting.status}
          onChange={(e) =>
            updateMainSetting('status', e.target.value as 'DRAFT' | 'PUBLISHED')
          }
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
