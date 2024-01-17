import React, { forwardRef } from 'react';
import { ChangeHandler, Control, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import ReactSelectCreatable from 'react-select/creatable';

export interface SelectProps
  extends Omit<
    React.ComponentProps<typeof ReactSelect> & React.ComponentProps<typeof ReactSelectCreatable>,
    'onChange'
  > {
  value?: any;
  defaultValue?: any;
  onChange?: ((val: any, actionMeta: any) => void) | ChangeHandler;
  onValueChange?: (val: any) => void;
  creatable?: boolean;
  control?: Control<any>;
  label?: string;
}

export const Select = forwardRef(function Select(
  { onValueChange, onChange, control, creatable, value, defaultValue, name, ...props }: SelectProps,
  ref: React.ForwardedRef<any>
) {
  // Allow value and defaultValue to optionally be the option.value instead of the whole option object
  const innerValue = value?.value ? value : props.options?.find((v: any) => v.value === value);
  const innerDefaultValue = defaultValue?.value
    ? defaultValue
    : props.options?.find((v: any) => v.value === defaultValue);

  // Provide onValueChange as a convenience
  const innerOnChange =
    (onChange || onValueChange) &&
    ((newVal: any, actionMeta: any) => {
      onChange && onChange(newVal, actionMeta);
      onValueChange && onValueChange(newVal.value);
    });

  const innerProps = {
    ...props,
    value: innerValue,
    defaultValue: innerDefaultValue,
    onChange: innerOnChange,
  };

  const labelElement = props.label && <label>{props.label}</label>;

  const SelectComponent = creatable ? ReactSelectCreatable : ReactSelect;

  let selectElement;
  if (control) {
    selectElement = (
      <Controller
        defaultValue={innerDefaultValue}
        control={control}
        name={name!}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <SelectComponent
            {...innerProps}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value?.value ? value : props.options?.find((v: any) => v.value === value)}
          />
        )}
      />
    );
  } else {
    selectElement = <SelectComponent {...innerProps} ref={ref} />;
  }

  return (
    <div>
      {labelElement}
      {selectElement}
    </div>
  );
});
