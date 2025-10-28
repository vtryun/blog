import MuiAlert from '@mui/material/Alert';
import {
  AlertBlockElement,
  RenderElementPropsFor,
} from '../../types/custom-types';
import { ReactEditor, useSlateStatic } from 'slate-react';

export function Alert(props: RenderElementPropsFor<AlertBlockElement>) {
  const { element, attributes, children, onClick } = props;
  const editor = useSlateStatic();
  const readOnly = ReactEditor.isReadOnly(editor);

  return (
    <MuiAlert
      {...attributes}
      severity={element.severity}
      onClick={readOnly ? null : onClick}
    >
      {children}
    </MuiAlert>
  );
}
