import React from "react";

export interface LabelProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  htmlFor?: string;
  //children?: React.ReactNode;
  //color?: Color;
}

export function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props}>
      {children}
    </label>
  );
}
