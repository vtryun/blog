import * as React from 'react';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {props.children}
      </body>
    </html>
  );
}
