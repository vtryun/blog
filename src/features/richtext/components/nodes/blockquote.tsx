import Box from '@mui/material/Box';
import {
  RenderElementPropsFor,
  BlockQuoteElement,
  CustomEditor,
  ParagraphElement,
} from '../../types/custom-types';
import { Transforms } from 'slate';
import { BLOCK_QUOTE_TYPE, PARAGRAPH_TYPE } from '../../constants/node-types';

export default function Blockquote(
  props: RenderElementPropsFor<BlockQuoteElement>
) {
  const { element, attributes, children } = props;

  return (
    <Box
      component="blockquote"
      {...attributes}
      sx={{
        pl: 2,
        borderLeftWidth: 4,
        borderLeftColor: 'primary.main',
        borderLeftStyle: 'solid',
      }}
    >
      {children}
    </Box>
  );
}

export const insertBlocoquote = (editor: CustomEditor) => {
  const blockquoteBlock: BlockQuoteElement = {
    type: BLOCK_QUOTE_TYPE,
    children: [{ text: '' }],
  };

  const paragraph: ParagraphElement = {
    type: PARAGRAPH_TYPE,
    children: [{ text: '' }],
  };

  Transforms.insertNodes(editor, [blockquoteBlock, paragraph]);
};
