import React, { forwardRef } from 'react';
import { Input, InputProps } from 'shadcn/Input';

interface TextInputProps
  extends InputProps {
  label?: string;
  onValueChange?: (value: string) => any;
  number?: boolean;
}

export const TextInput = forwardRef(function TextInput(
  { label, onValueChange, onChange, number, ...props }: TextInputProps,
  ref: React.ForwardedRef<any>
) {
  const labelElement = label && <label>{label}</label>;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(ev);
    onValueChange && onValueChange(ev.target.value);
  };

  return (
    <div>
      {labelElement}
      <Input type={number ? 'number' : 'text'} onChange={handleChange} ref={ref} {...props} />
    </div>
  );
});
