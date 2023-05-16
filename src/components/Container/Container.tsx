import * as React from 'react';
import { Container as MuiContainer } from '@mui/system';

interface Props {
  children: JSX.Element | JSX.Element[]; 
}

const Container = ({
  children
}: Props) => {
  return ( 
    <MuiContainer>
      {children}
    </MuiContainer>
   );
}
 
export default Container;