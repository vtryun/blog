import { Devicon } from '@/share/components/devicon';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Header from '@/share/components/header';

const devIcons = [
  { name: 'html5', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'css3', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  {
    name: 'javascript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  { name: 'typescript', url: 'https://www.typescriptlang.org/' },
  { name: 'vuejs', url: 'https://vuejs.org/' },
  { name: 'react', url: 'https://react.dev/' },
  { name: 'nextjs', url: 'https://nextjs.org/' },
  { name: 'java', url: 'https://www.oracle.com/java/' },
  { name: 'spring', url: 'https://spring.io/' },
  { name: 'go', url: 'https://go.dev/', wordmark: true },
  { name: 'rust', url: 'https://www.rust-lang.org/' },
  { name: 'postgresql', url: 'https://www.postgresql.org/' },
  { name: 'mysql', url: 'https://www.mysql.com/' },
  { name: 'docker', url: 'https://www.docker.com/' },
  { name: 'git', url: 'https://git-scm.com/' },
  { name: 'prisma', url: 'https://www.prisma.io/' },
  { name: 'materialui', url: 'https://mui.com/' },
  { name: 'tailwindcss', url: 'https://tailwindcss.com/' },
  { name: 'vitejs', url: 'https://vitejs.dev/' },
  { name: 'webpack', url: 'https://webpack.js.org/' },
];

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <Box>
      <Header />
      <Stack direction="row" justifyContent="space-around" mt={10}>
        <Box>
          <Typography fontWeight={600} sx={{ textTransform: 'capitalize' }}>
            the technologys i used (some of them are learning right now)
          </Typography>
          <Stack direction="row" flexWrap="wrap" width={200}>
            {devIcons.map((icon) => (
              <Link
                key={icon.name}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tooltip title={icon.name}>
                  <IconButton>
                    <Devicon
                      name={icon.name}
                      {...(icon.wordmark && { wordmark: true })}
                    />
                  </IconButton>
                </Tooltip>
              </Link>
            ))}
          </Stack>
        </Box>
        
        <Box>
          <Box
            component="img"
            src="avatar.jpg"
            width={200}
            sx={{ borderRadius: 4 }}
          ></Box>
        </Box>
      </Stack>
    </Box>
  );
}
