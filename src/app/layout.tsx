import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme from '@/share/styles/theme';
import { Roboto, Fira_Code } from 'next/font/google';
import CssBaseline from '@mui/material/CssBaseline';
import SnackbarAlert from '@/share/components/snackbar-alert';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const firaCode = Fira_Code({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-firaCode',
});

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
            <SnackbarAlert />
            <CssBaseline />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
