import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import { common, grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function BlogPanel({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (value: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState<string>('');

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInputValue('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Box mt={2}>
      <Accordion
        defaultExpanded
        square
        elevation={0}
        sx={{
          bgcolor: common.white,
          borderRadius: 5,
          border: 1,
          borderColor: grey[200],
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" sx={{ fontWeight: 500, fontSize: 18 }}>  
            tags
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1}>
            <TextField
              label="tags"
              variant="outlined"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button
              variant="contained"
              disableElevation
              onClick={() => addTag()}
            >
              add
            </Button>
          </Stack>
          <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
