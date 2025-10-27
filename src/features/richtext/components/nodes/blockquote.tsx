import Box from '@mui/material/Box';
import {
  RenderElementPropsFor,
  BlockQuoteElement,
} from '../../types/custom-types';

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
