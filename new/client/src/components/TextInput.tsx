import React, { forwardRef } from 'react';

interface TextInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  onValueChange?: (value: string) => any;
}

export const TextInput = forwardRef(function TextInput(
  { label, onValueChange, onChange, ...props }: TextInputProps,
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
      <input type='text' onChange={handleChange} ref={ref} {...props} />
    </div>
  );
});
