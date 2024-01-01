import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  onClick?: () => any;
  color?: ButtonColor;
  size?: ButtonSize;
}

type ButtonSize = "xlarge" | "large" | "medium" | "small" | "xsmall";
type ButtonColor =
  | "success"
  | "error"
  | "warning"
  | "primary"
  | "secondary"
  | "tertiary"
  | "gray";

export function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}
