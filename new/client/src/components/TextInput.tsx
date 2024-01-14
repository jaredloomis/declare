import React from 'react';

interface TextInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  onValueChange?: (value: string) => any;
}

export function TextInput({ label, onValueChange, ...props }: TextInputProps) {
  const labelElement = label && <label>{label}</label>;
  return (
    <div>
      {labelElement}
      <input type='text' onChange={ev => onValueChange && onValueChange(ev.target.value)} {...props} />
    </div>
  );
}
