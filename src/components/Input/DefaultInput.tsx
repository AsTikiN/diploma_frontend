import React, { FC, ReactElement } from 'react';
import { TextField as MuiTextField, styled, FormControlLabel  } from '@mui/material';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  startIcon?: JSX.Element,
  endIcon?: JSX.Element,
  fullWidth?: boolean;
  placeholder?: string;
  label?: string;
}

const DefaultInput: FC<Props> = ({
  value,
  setValue,
  startIcon,
  endIcon,
  fullWidth,
  placeholder,
  label
}): ReactElement => {

  const handleInputChange = (e: any) => setValue(e.target.value);

  return ( 
    <div>
      <Label>{label}</Label>
      <TextField 
        value={value} 
        onChange={handleInputChange} 
        fullWidth={fullWidth}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            startIcon
          ),
          endAdornment: (
            endIcon
          )
        }}
        />
    </div>
    );
}

const TextField = styled(MuiTextField)({
  marginTop: "5px",
  fontFamily: "arial",

  "& svg": {
    height: "28px",
    width: "28px"
  }
})

const Label = styled("label")({
})
 
export default DefaultInput;