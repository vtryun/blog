import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useState } from "react";

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isBig' && prop !== 'isHovered',
})<{ isBig?: boolean; isHovered?: boolean }>(({ isBig, isHovered }) => ({
  // width: isBig ? 'full' : 320,
  // minWidth: 320,
  // maxWidth: isBig ? 660 : 427,
  // padding: isBig ? 0 : 16,
  // position: isHovered ? 'absolute' : 'relative',
  position: 'relative',
  boxShadow: 'none',
  zIndex: isHovered ? 2 : 0,
  transitionDelay: isHovered ? '0s' : '.1s',
  top: 0,
  left: 0,
  overflow: 'visible',
  cursor: 'pointer',
  backgroundColor: 'transparent',
}));

const HoverShadow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})<{ isHovered?: boolean }>(({ isHovered }) => ({
  position: 'absolute',
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  inset: isHovered ? 0 : 5,
  opacity: isHovered ? 1 : 0,
  zIndex: -1,
  borderRadius: 8,
  transition: 'all .1s ease-in',
  boxShadow: isHovered
    ? '0px 6px 16px 0px rgba(0,0,0, .12)'
    : '0px 6px 0px 0px rgba(0,0,0,0)',
}));

export default function TestCard({children}: {children: React.ReactNode}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledCard
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HoverShadow isHovered={isHovered} />
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};