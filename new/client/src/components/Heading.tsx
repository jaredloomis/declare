import React from "react";
import { Color } from "./color";

interface HeadingProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  size?: HeadingSize;
}

type HeadingSize = "xlarge" | "large" | "medium" | "small" | "xsmall";

export function Heading({ children, size='medium', ...props }: HeadingProps) {
  const elementTag = {
    xlarge: "h1",
    large: "h2",
    medium: "h3",
    small: "h4",
    xsmall: "h5",
  }[size];

  const x = <h1></h1>

  return (
    React.createElement(elementTag, { children, ...props })
  );
}
