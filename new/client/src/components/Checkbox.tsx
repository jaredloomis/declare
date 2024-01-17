import React, { ChangeEvent } from 'react';

export interface CheckboxProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  label?: string;
  onValueChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef(function Checkbox(
  { onChange, onValueChange, label, ...props }: CheckboxProps,
  ref: React.Ref<HTMLInputElement>
) {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(ev);
    onValueChange && onValueChange(ev.target.checked);
  };

  return (
    <>
      <label>{label}</label>
      <input type='checkbox' onChange={handleChange} ref={ref} {...props} />
    </>
  );
});
