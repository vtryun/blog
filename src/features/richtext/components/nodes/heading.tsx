import Typography from '@mui/material/Typography';
import {
  HeadingElement,
  RenderElementPropsFor,
} from '@/features/richtext/types/custom-types';

export function H1(props: RenderElementPropsFor<HeadingElement>) {
  return <Typography variant="h1">{props.children}</Typography>;
}

export function H2(props: RenderElementPropsFor<HeadingElement>) {
  return (
    <Typography variant="h2" fontWeight={600} fontSize={26} my={2}>
      {props.children}
    </Typography>
  );
}

export function H3(props: RenderElementPropsFor<HeadingElement>) {
  return (
    <Typography variant="h3" fontWeight={600} fontSize={24} my={2}>
      {props.children}
    </Typography>
  );
}

export function H4(props: RenderElementPropsFor<HeadingElement>) {
  return <Typography variant="h4">{props.children}</Typography>;
}

export function H5(props: RenderElementPropsFor<HeadingElement>) {
  return <Typography variant="h5">{props.children}</Typography>;
}

export function H6(props: RenderElementPropsFor<HeadingElement>) {
  return <Typography variant="h6">{props.children}</Typography>;
}
