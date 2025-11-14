import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact, Slate } from 'slate-react';
import { withLayout } from '@/features/richtext/plugins/with-layout';
import { INITIAL_VALUE } from '@/features/richtext/constants/initvalue';

import BlogHeader from '@/features/blog/blog-header';
import BlogInfo from '@/features/blog/blog-info';
import BlogPanel from '@/features/blog/blog-panel';
import BlogEditor from '@/features/blog/blog-editor';
import { isEditorContentNotEmpty } from '@/features/richtext/utils';

type Status = 'PRIVATE' | 'DRAFT' | 'PUBLIC';

export const Route = createFileRoute('/blog_/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('PUBLIC');
  const [content, setContent] = useState<boolean>(false);
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );

  return (
    <Box bgcolor="#f6f7f8">
      <BlogHeader
        mode="create"
        title={title}
        content={editor.children}
        tags={tags}
        status={status}
      />
      <Box
        sx={{
          p: 5,
          height: 'calc(100vh - 65px)',
          mx: 'auto',
          maxWidth: 1500,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          height="100%"
          gap={2}
        >
          <Slate
            editor={editor}
            initialValue={INITIAL_VALUE}
            onChange={() => {
              const content = isEditorContentNotEmpty(editor);
              setContent(content);
            }}
          >
            <BlogEditor title={title} setTitle={setTitle} mode="create" />
            <Box>
              <Box
                sx={{
                  width: 400,
                  position: 'sticky',
                  top: 0,
                }}
              >
                <BlogInfo
                  title={!!title}
                  content={content}
                  tags={tags.length > 0}
                />
                <BlogPanel tags={tags} setTags={setTags} />
              </Box>
            </Box>
          </Slate>
        </Stack>
      </Box>
    </Box>
  );
}
