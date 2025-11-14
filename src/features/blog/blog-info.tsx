import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Divider from '@mui/material/Divider';
import { common, grey, green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function BlogInfo({
  title,
  content,
  tags,
}: {
  title: boolean;
  content: boolean;
  tags: boolean;
}) {
  return (
    <Box
      sx={{
        bgcolor: common.white,
        borderRadius: 5,
        border: 1,
        borderColor: grey[200],
      }}
    >
      <Typography
        sx={{
          color: grey[700],
          fontWeight: 600,
          fontSize: 18,
          p: 2,
        }}
      >
        publishing
      </Typography>
      <Divider sx={{ width: '100%' }} />
      <Box p={2}>
        <Stack spacing={2} pb={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <VisibilityOutlinedIcon sx={{ color: grey[500], fontSize: 18 }} />
              <Typography sx={{ color: grey[600], fontWeight: 500 }}>
                visibility
              </Typography>
            </Stack>
            <Typography color="primary" fontWeight={500}>
              public
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarTodayIcon sx={{ color: grey[500], fontSize: 18 }} />
              <Typography sx={{ color: grey[600], fontWeight: 500 }}>
                publish date
              </Typography>
            </Stack>
            <Typography color="primary" fontWeight={500}>
              immediately
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack spacing={1} py={2}>
          <Typography sx={{ color: grey[800], fontWeight: 500 }}>
            pre-publish checklist
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {title ? (
              <CheckCircleOutlineIcon
                sx={{ color: green[500], fontSize: 18 }}
              />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 18 }} />
            )}
            <Typography sx={{ color: title ? grey[700] : grey[500] }}>
              add a title
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            {content ? (
              <CheckCircleOutlineIcon
                sx={{ color: green[500], fontSize: 18 }}
              />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 18 }} />
            )}
            <Typography sx={{ color: title ? grey[700] : grey[500] }}>
              write content
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            {tags ? (
              <CheckCircleOutlineIcon
                sx={{ color: green[500], fontSize: 18 }}
              />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 18 }} />
            )}
            <Typography sx={{ color: tags ? grey[700] : grey[500] }}>
              add tags
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
