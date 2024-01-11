import React from "react";
import { Color } from "./color";

export interface AlertProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  color?: Color;
}

export function Alert({ children, onClick, ...props }: AlertProps) {
  return (
    <span onClick={onClick} {...props}>
      {children}
    </span>
  );
}
