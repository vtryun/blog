import MuiAlert from '@mui/material/Alert';
import { AlertBlockElement, RenderElementPropsFor } from '../../types/custom-types';

export function Alert(props: RenderElementPropsFor<AlertBlockElement>) {
  const { element, attributes, children } = props;

  return (
    <MuiAlert {...attributes} severity={element.severity}>
      {children}
    </MuiAlert>
  );
}
