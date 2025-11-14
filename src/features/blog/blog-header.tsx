import PublishIcon from '@mui/icons-material/Publish';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import Box from '@mui/material/Box';
import { common, grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import { createServerFn } from '@tanstack/react-start';
import { auth } from '@/lib/auth';
import slugify from 'slugify';
import { Descendant } from 'slate';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { useSnackbar } from '@/share/hooks/use-snackbar';
import { useState } from 'react';
import { PostStatus } from '@prisma/client';
import EditIcon from '@mui/icons-material/Edit';
import { useSession } from '@/lib/auth-client';

const PostSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  content: z.array(z.any()).min(1, 'Content cannot be empty'),
  tags: z.array(z.string()).min(1, 'Tags cannot be empty'),
  status: z.enum(PostStatus),
});

export const createPost = createServerFn({ method: 'POST' })
  .inputValidator(PostSchema)
  .handler(async (ctx: any) => {
    const session = await auth.api.getSession({
      headers: ctx.request.headers,
    });

    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const authorId = session.user.id;
    const { title, content, tags, status } = ctx.data;

    const slug = slugify(title, { lower: true, strict: true });
    console.log({ slug });

    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      throw new Error(`Duplicate slug: ${slug}. Please change the title.`);
    }

    // ✅ 使用事务
    const result = await prisma.$transaction(async (tx) => {
      // Step 1️⃣: Upsert 所有 tags
      const tagRecords = await Promise.all(
        tags.map((tagName: string) =>
          tx.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          })
        )
      );

      // Step 2️⃣: 创建 post 并关联 tags
      const newPost = await tx.post.create({
        data: {
          title,
          slug,
          content,
          status,
          authorId,
          tags: {
            connect: tagRecords.map((t) => ({ id: t.id })),
          },
        },
        include: { tags: true },
      });

      return newPost;
    });

    return {
      success: true,
      post: result,
    };
  });

export default function BlogHeader({
  mode,
  title,
  content,
  tags,
  status,
}: {
  mode: 'create' | 'edit';
  title: string;
  content: Descendant[];
  tags: string[];
  status: PostStatus;
}) {
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();
  const handlePublish = async () => {
    try {
      setLoading(true);

      const res = await createPost({
        data: { title, content, tags, status },
      });

      if (res?.success) {
        showSnackbar('🎉 Published successfully!', 'success');
      }
    } catch (error) {
      let messages: string[] = [];
      if (error instanceof Error) {
        try {
          const errorsArray = JSON.parse(error.message);
          if (Array.isArray(errorsArray)) {
            messages = errorsArray.map(
              (err: any) => err.message || 'Unknown error'
            );
          }
        } catch (parseError) {
          messages = [error.message];
        }
      } else {
        messages = ['An unknown error occurred'];
      }
      if (messages.length > 0) {
        // showSnackbar(messages[0], 'error');
        showSnackbar(messages.join(','), 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const log = () => {
    console.log({
      // title,
      // tags,
      content,
      // status,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: common.white,
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          top: 0,
        }}
      >
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            maxWidth={1500}
            mx="auto"
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ArticleIcon color="primary" />
              <Typography fontWeight={600} fontSize={20} color={common.black}>
                my blog
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                sx={{
                  borderColor: grey[300],
                  color: common.black,
                  textTransform: 'capitalize',
                }}
                variant="outlined"
                onClick={log}
              >
                preview
              </Button>
              {mode === 'create' && (
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  variant="contained"
                  startIcon={<PublishIcon />}
                  // disabled={disabled}
                  disableElevation
                  onClick={handlePublish}
                >
                  publish
                </Button>
              )}

              {mode === 'edit' && (
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  variant="contained"
                  startIcon={<EditIcon />}
                  // disabled={disabled}
                  disableElevation
                  onClick={handlePublish}
                >
                  edit
                </Button>
              )}
              <Avatar src={session?.user?.image ?? undefined} alt="用户头像" />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
