import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

interface AlertSettingProps {
  props: Record<string, any>;
  update: (newProps: Record<string, any>) => void;
}

export function AlertSetting({ props, update }: AlertSettingProps) {
  return (
    <Box>
      {' '}
      <FormLabel>Severity</FormLabel>
      <RadioGroup
        value={props.severity || 'info'}
        onChange={(e) => update({ severity: e.target.value })}
      >
        <FormControlLabel value="success" control={<Radio />} label="Success" />
        <FormControlLabel value="info" control={<Radio />} label="Info" />
        <FormControlLabel value="warning" control={<Radio />} label="Warning" />
        <FormControlLabel value="error" control={<Radio />} label="Error" />
      </RadioGroup>
      <FormLabel>Variant</FormLabel>
      <RadioGroup
        value={props.variant || 'filled'}
        onChange={(e) => update({ variant: e.target.value })}
      >
        <FormControlLabel
          value="standard"
          control={<Radio />}
          label="Standard"
        />
        <FormControlLabel
          value="outlined"
          control={<Radio />}
          label="Outlined"
        />
        <FormControlLabel value="filled" control={<Radio />} label="Filled" />
      </RadioGroup>
    </Box>
  );
}
