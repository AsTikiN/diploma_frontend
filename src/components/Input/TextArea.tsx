import React, { FC, ReactElement} from 'react';
import { TextareaAutosize as MuiTextareaAutosize, styled } from "@mui/material";

type Size = "small" | "large"; 

interface Props {
  placeholder?: string;
  label?: string;
  limit?: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  size: Size;
}

const TextArea: FC<Props> = ({
  placeholder,
  label,
  limit,
  value,
  setValue,
  size
}): ReactElement => {

  const handleAreaChange = (e: any) => {
    const value = e.target.value;
    
    if(!limit || value.length < limit) {
      setValue(value);
      return
    }

    setValue(value.slice(0, limit));
  }

  return ( 
    <Wrapper>
      <Label>{label}</Label>
      <TextareaAutosize 
        placeholder={placeholder}
        value={value}
        onChange={handleAreaChange}
        size={size} />
      {
        limit && 
          <Limit>
            {`Limit ${value.length} of ${limit}`}
          </Limit>
      }
    </Wrapper>
   );
}

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column"
})

const TextareaAutosize = styled(MuiTextareaAutosize)<{size: Size}>(({size}) => ({
  width: "100%",
  resize: "none",
  boxSizing: "border-box",
  height: size === "small" ? "100px !important" 
  : size === "large" ? "200px !important" 
  : "auto",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "10px",
  fontFamily: "arial",

  "&:focus-visible": {
    outline: "none",
    borderColor: "#1976d2",
    borderWidth: "2px"
  }
}))

const Label = styled("label")({

})

const Limit = styled("div")({
  fontSize: "14px",
  alignSelf: "flex-end"
})

export default TextArea;