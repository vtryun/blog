import {
  RenderElementPropsFor,
  DividerElement,
} from '../../types/custom-types';
import MuiDivider from '@mui/material/Divider';

export default function Divider(props: RenderElementPropsFor<DividerElement>) {
  const { element, attributes, children } = props;

  return <MuiDivider {...attributes}/>;
}
