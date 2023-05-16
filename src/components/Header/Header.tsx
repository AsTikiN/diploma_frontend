import React, { useState, FC, ReactElement, useEffect } from 'react';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import { styled } from '@mui/material';
import Container from "../Container/Container";
import Modal from '../Modal/Modal';

const Header: FC = (): ReactElement => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => setOpenAddModal(true);

  return ( 
    <InnerWrapper>
      <Container>
        <Wrapper>
          <Logo />
          <Button variant='contained' color='primary' onClick={handleAddClick}>Add path</Button>
          <Modal open={openAddModal} setOpen={setOpenAddModal} />
        </Wrapper>
      </Container>
    </InnerWrapper>
   );
}

const Wrapper = styled("div")({
  background: "#152238",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
})

const InnerWrapper = styled("div")({
  background: "#152238",
})

export default Header;