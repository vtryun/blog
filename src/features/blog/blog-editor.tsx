import { useDecorate } from '@/features/richtext/hooks/useDecorate';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';
import {
  RenderElementProps,
  RenderLeafProps,
  Editable,
  useSlate,
} from 'slate-react';
import { Element } from '@/features/richtext/components/element-render';
import { Leaf } from '@/features/richtext/components/leaf-render';
import { common, grey } from '@mui/material/colors';
import Toolbar from '@/features/richtext/components/toolbar';
import Typography from '@mui/material/Typography';

export default function BlogEditor({
  mode,
  title,
  setTitle,
}: {
  mode: 'create' | 'edit';
  title: string;
  setTitle: (value: string) => void;
}) {
  const editor = useSlate();
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
    <Stack flex={1}>
      <Box
        component="input"
        placeholder="title"
        disabled={mode === 'edit'}
        value={title}
        onChange={(e) => setTitle(e.target.value as string)}
        sx={{
          p: 2,
          mb: 1,
          height: 56,
          fontSize: 24,
          fontWeight: 600,
          bgcolor: common.white,
          borderRadius: 2,
          border: 1,
          borderColor: grey[200],
          '&:focus': { outline: 0 },
        }}
      ></Box>

      <Stack
        bgcolor={common.white}
        flex={1}
        sx={{
          borderRadius: 5,
          border: 1,
          borderColor: grey[200],
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar />
        </Box>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          decorate={decorate}
          spellCheck={false}
          autoFocus
          placeholder="Enter the content..."
          renderPlaceholder={({ attributes, children }) => (
            <Typography
              component="span"
              {...attributes}
              sx={{ pt: 1.5, pl: 1, fontSize: 26, fontWeight: 500 }}
            >
              {children}
            </Typography>
          )}
          style={{
            flex: 1,
            padding: 20,
            outline: 'none',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        />
      </Stack>
    </Stack>
  );
}
