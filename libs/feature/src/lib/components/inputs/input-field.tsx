import { ChangeEvent, ReactNode, CSSProperties, memo } from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface InputFieldProps {
  id: string;
  name: string;
  label?: string;
  value: string;
  placeholder: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputStyle: CSSProperties;
  labelStyle: CSSProperties;
}

export const InputField = memo(
  ({
    id,
    name,
    label,
    value,
    placeholder,
    onChange,
    type = 'text',
    startIcon,
    endIcon,
    inputStyle,
    labelStyle,
  }: InputFieldProps) => {
    return (
      <>
        <label style={labelStyle} htmlFor={id}>
          {label}
        </label>
        <TextField
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          sx={inputStyle}
          slotProps={{
            input: {
              startAdornment: startIcon && (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
              endAdornment: endIcon && (
                <InputAdornment position="end">{endIcon}</InputAdornment>
              ),
            },
          }}
        />
      </>
    );
  }
);
