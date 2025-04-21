import { TextField, InputAdornment, Typography } from '@mui/material';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  inputStyle?: object;
  labelStyle?: object;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: string;
  id?: string;
}

export const InputField = <T extends FieldValues>({
  name,
  register,
  label,
  placeholder,
  error,
  helperText,
  inputStyle,
  labelStyle,
  startIcon,
  endIcon,
  type = 'text',
  id,
}: InputFieldProps<T>) => {
  return (
    <>
      {label && (
        <Typography component="label" htmlFor={id} sx={labelStyle}>
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        id={id}
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        {...register(name)}
        sx={inputStyle}
        slotProps={{
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ) : undefined,
            endAdornment: endIcon ? (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            ) : undefined,
          },
        }}
      />
    </>
  );
};
