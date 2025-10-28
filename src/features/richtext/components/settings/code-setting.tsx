import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LANGUAGES } from '../../constants/languages';
import InputLabel from '@mui/material/InputLabel';

interface CodeSettingProps {
  props: Record<string, any>;
  update: (newProps: Record<string, any>) => void;
}

export function CodeSetting({ props, update }: CodeSettingProps) {
  const handleChange = (event: any) => {
    update({ ...props, language: event.target.value });
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="code-language-select-label">Language</InputLabel>
        <Select
          labelId="code-language-select-label"
          id="code-language-select"
          value={props.language || 'plaintext'}
          label="Language"
          onChange={handleChange}
          renderValue={(value) => {
            const lang = LANGUAGES.find((l) => l.value === value);
            return (
              <Stack direction="row" alignItems="center" spacing={1}>
                {lang && (
                  <Box
                    component="img"
                    src={lang.icon}
                    alt={lang.label}
                    sx={{ width: 22, height: 22 }}
                  />
                )}
                <Typography>{lang?.label ?? value}</Typography>
              </Stack>
            );
          }}
        >
          {LANGUAGES.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={lang.icon}
                  alt={lang.label}
                  sx={{ width: 22, height: 22 }}
                />
                <Typography>{lang.label}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
