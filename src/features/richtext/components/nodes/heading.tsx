import Typography from '@mui/material/Typography';
import {
  HeadingElement,
  HeadingFourElement,
  HeadingSixElement,
  HeadingThreeElement,
  HeadingTwoElement,
  RenderElementPropsFor,
} from '@/features/richtext/types/custom-types';

export function H1(props: RenderElementPropsFor<HeadingElement>) {
  return <Typography variant="h1">{props.children}</Typography>;
}

export function H2(props: RenderElementPropsFor<HeadingTwoElement>) {
  return <Typography variant="h2">{props.children}</Typography>;
}

export function H3(props: RenderElementPropsFor<HeadingThreeElement>) {
  return <Typography variant="h3">{props.children}</Typography>;
}

export function H4(props: RenderElementPropsFor<HeadingFourElement>) {
  return <Typography variant="h4">{props.children}</Typography>;
}

export function H5(props: RenderElementPropsFor<HeadingFourElement>) {
  return <Typography variant="h5">{props.children}</Typography>;
}

export function H6(props: RenderElementPropsFor<HeadingSixElement>) {
  return <Typography variant="h6">{props.children}</Typography>;
}
