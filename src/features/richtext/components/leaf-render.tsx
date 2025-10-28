import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import { RenderLeafProps } from 'slate-react';

export const Leaf = (props: RenderLeafProps) => {
  let children = props.children;
  const { attributes, leaf } = props;
  const { text, ...rest } = leaf;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.href) {
    children = (
      <MuiLink component={Link} href={leaf.href}>
        {children}
      </MuiLink>
    );
  }

  return (
    <span {...attributes} className={Object.keys(rest).join(' ')}>
      {children}
    </span>
  );
};
