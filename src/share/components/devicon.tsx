interface DeviconProps {
  name: string;
  size?: number;
  wordmark?: boolean;
}

export const Devicon = ({ name, size = 24, wordmark }: DeviconProps) => {
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${
        wordmark ? 'original-wordmark' : 'original'
      }.svg`}
      height={size}
      alt={name}
      style={{ display: 'inline-block' }}
    />
  );
};