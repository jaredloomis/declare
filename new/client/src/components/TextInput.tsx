import React, { forwardRef } from 'react';

interface TextInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  onValueChange?: (value: string | number) => any;
  number?: boolean;
}

export const TextInput = forwardRef(function TextInput(
  { label, onValueChange, onChange, number, ...props }: TextInputProps,
  ref: React.ForwardedRef<any>
) {
  const labelElement = label && <label>{label}</label>;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(ev);
    onValueChange && onValueChange(number ? parseInt(ev.target.value) : ev.target.value);
  };

  return (
    <div>
      {labelElement}
      <input type={number ? 'number' : 'text'} onChange={handleChange} ref={ref} {...props} />
    </div>
  );
});
