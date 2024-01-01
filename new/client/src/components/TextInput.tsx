import React from "react";

interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  onValueChange?: (value: string) => any;
}

export function TextInput({ label, onValueChange, ...props }: TextInputProps) {
  return (
    <input
      type="text"
      placeholder={label}
      onChange={ev => onValueChange && onValueChange(ev.target.value)}
      {...props}
    />
  );
}
