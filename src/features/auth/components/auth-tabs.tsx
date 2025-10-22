'use client';

import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LoginForm from '@/features/auth/components/signin-form';
import RegisterForm from '@/features/auth/components/signup-form';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AuthTabs({ callbackUrl }: { callbackUrl: string }) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Stack
        sx={{
          border: '1px solid #eee',
          width: 500,
          gap: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="auth tabs"
          sx={{
            '& .MuiTabs-flexContainer': {
              // justifyContent: 'space-around',
            },
          }}
        >
          <Tab label="Login" sx={{ flex: 1 }} />
          <Tab label="Register" sx={{ flex: 1 }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <LoginForm callbackUrl={callbackUrl} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterForm />
        </TabPanel>
      </Stack>
    </Box>
  );
}
