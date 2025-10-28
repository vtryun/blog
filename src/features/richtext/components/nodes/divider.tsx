import { Transforms } from 'slate';
import {
  RenderElementPropsFor,
  DividerElement,
  CustomEditor,
  ParagraphElement,
} from '../../types/custom-types';
import MuiDivider from '@mui/material/Divider';
import { DIVIDER_TYPE } from '../../constants/node-types';

export default function Divider(props: RenderElementPropsFor<DividerElement>) {
  const { element, attributes, children } = props;

  return <MuiDivider {...attributes} />;
}

export const insertDivider = (editor: CustomEditor) => {
  console.log('added: code-block');

  const divider: DividerElement = {
    type: DIVIDER_TYPE,
    children: [{ text: '' }],
  };

  const paragraph: ParagraphElement = {
    type: 'paragraph',
    children: [{ text: '' }],
  };

  Transforms.insertNodes(editor, [divider, paragraph]);
};
