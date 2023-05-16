import * as React from 'react';
import { Button as MuiButton, styled } from '@mui/material';

interface Props {
  children: JSX.Element | string;
  color?: "primary" | "secondary";
  variant?: "outlined" | "contained" | "text";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
}

const Button = ({
  children,
  color,
  variant,
  onClick,
  fullWidth
}: Props) => {
  return ( 
    <CustomButton fullWidth={fullWidth} color={color} variant={variant} onClick={onClick}>
      {children}
    </CustomButton>
   );
}

const CustomButton = styled(MuiButton)({
  fontFamily: "arial",
  fontWeight: 600
})
 
export default Button;