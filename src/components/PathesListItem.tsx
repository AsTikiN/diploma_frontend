import React, { FC, ReactElement } from 'react';
import { styled } from "@mui/material";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md"
import { Saunter } from "../types";
import { useActions } from '../hooks/useActions';

const PathesListItem:FC<Saunter> = ({
  id,
  title,
  shortDesc,
  path,
  isFavourite
}): ReactElement => {

  const { selectSaunter } = useActions();

  const handlePathClick = () => selectSaunter(id);

  return ( 
    <Wrapper onClick={handlePathClick}>
      <Icon>
        <HiOutlineArrowsExpand />
      </Icon>
      <Info>
        <Title>
          {isFavourite && <AiFillStar />}
          {title.length > 25 ? title.slice(0, 25) + "..." : title}
        </Title>

        <Description>
          {shortDesc}
        </Description>
      </Info>

      <Distance>
        {JSON.parse(path)?.len}
      </Distance>

      <MdArrowForwardIos />
    </Wrapper>
   );
}

const Wrapper = styled("li")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  marginTop: "15px",
})

const Info = styled("div")({
  flex: 1
})

const Icon = styled("div")({
  "& svg": {
    width: "50px",
    height: "50px"
  }
})

const Title = styled("div")({
  fontSize: "24px",
  display: "flex",
  alignItems: "center",
  lineHeight: "40px",

  "& svg": {
    width: "24px",
    height: "24px"
  },
})

const Description = styled("div")({
  maxHeight: "45px",
  overflow: "hidden",
})

const Distance = styled("div")({
  fontWeight: 600,
  fontSize: "18px"
})
 
export default PathesListItem;