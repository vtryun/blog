import MuiAlert from '@mui/material/Alert';
import {
  AlertBlockElement,
  CustomEditor,
  ParagraphElement,
  RenderElementPropsFor,
} from '../../types/custom-types';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { Transforms } from 'slate';
import { ALERT_TYPE, PARAGRAPH_TYPE } from '../../constants/node-types';

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

export function insertAlert(editor: CustomEditor) {
  const alertBlock: AlertBlockElement = {
    type: ALERT_TYPE,
    children: [{ text: '' }],
    severity: 'success',
  };

  const paragraph: ParagraphElement = {
    type: PARAGRAPH_TYPE,
    children: [{ text: '' }],
  };

  Transforms.insertNodes(editor, [alertBlock, paragraph]);
}
