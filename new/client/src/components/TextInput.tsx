import React, { forwardRef } from 'react';

interface TextInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  onValueChange?: (value: string) => any;
}

export const TextInput = forwardRef(function TextInput({ label, onValueChange, ...props }: TextInputProps, ref: React.ForwardedRef<any>) {
  const labelElement = label && <label>{label}</label>;
  return (
    <div>
      {labelElement}
      <input type='text' onChange={ev => onValueChange && onValueChange(ev.target.value)} ref={ref} {...props} />
    </div>
  );
});
