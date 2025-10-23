'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostShow from '@/features/richtext/components/post-show';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';

export default function PageTabs({ posts }: { posts: any[] }) {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
            sx={{
              '& .MuiButtonBase-root': {
                textTransform: 'none',
              },
              '& .Mui-selected': { color: 'text.secondary' },
            }}
          >
            <Tab label="Post" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 0 }}>
          <Stack divider={<Divider />}>
            {posts.map((post) => (
              <MuiLink
                component={Link}
                key={post.slug}
                underline="none"
                href={`post/${post.slug}`}
                sx={{ color: 'black', p: 2, '&:hover': { bgcolor: '#f7f7f7' } }}
              >
                <PostShow content={post.content} mode="anthor" />
              </MuiLink>
            ))}
          </Stack>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
