import { useDecorate } from '@/features/richtext/hooks/useDecorate';
import prisma from '@/lib/prisma';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useCallback, useMemo } from 'react';
import {
  RenderElementProps,
  RenderLeafProps,
  Slate,
  Editable,
  withReact,
} from 'slate-react';
import { Element } from '@/features/richtext/components/element-render';
import { Leaf } from '@/features/richtext/components/leaf-render';
import { withLayout } from '@/features/richtext/plugins/with-layout';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { format } from 'date-fns';
import { CustomLink } from '@/share/components/custom-link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const getBlogBySlug = createServerFn({ method: 'GET' })
  .inputValidator((d: string) => d)
  .handler(async ({ data, context }) => {
    const post = await prisma.post.findUnique({
      where: { slug: data },
      include: { tags: true, author: true },
    });

    if (!post) {
      throw notFound();
    }

    return post;
  });

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params: { slug } }) => getBlogBySlug({ data: slug }),
  component: RouteComponent,
  notFoundComponent: () => <div>not found</div>,
});

function RouteComponent() {
  const post = Route.useLoaderData();
  const decorate = useDecorate();
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
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
    <Box>
      <Container>
        <CustomLink
          to=".."
          sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 5 }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          back
        </CustomLink>

        <Typography variant="h1" my={2} fontWeight={500} fontSize={60}>
          {post.title}
        </Typography>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={post.author.image ?? undefined}
            />
            <Stack>
              <Typography fontWeight={600}>{post.author.name}</Typography>
              <Typography variant="caption">
                {format(post.createdAt, 'yyyy-MM-dd HH:mm:ss')}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Slate editor={editor} initialValue={post.content as Descendant[]}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            spellCheck={false}
            readOnly={true}
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
        </Slate>
      </Container>
    </Box>
  );
}
