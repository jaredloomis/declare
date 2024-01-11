import React from "react";
import ReactSelect from 'react-select';

export interface SelectProps extends Omit<React.ComponentProps<typeof ReactSelect>, 'onChange'> {
  onChange: (val: any) => void;
}

export function Select({ onChange, defaultValue, ...props }: SelectProps) {
  const innerDefaultValue = props.options?.find((v: any) => v.value === defaultValue);
  const innerOnChange = (newVal: any, _: any) => onChange(newVal.value);

  return (
    <ReactSelect {...props} defaultValue={innerDefaultValue} onChange={innerOnChange} />
  );
}
