import React from 'react';
import { Color } from './color';
import { useNavigate } from 'react-router-dom';
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from 'shadcn/Button';

interface ButtonProps
  extends ShadcnButtonProps {
  children?: React.ReactNode;
  onClick?: () => any;
//  color?: Color;
  to?: string;
}

export function Button({ children, onClick, ...props }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (props.to) {
      navigate(props.to);
    }
  };

  return (
    <ShadcnButton onClick={handleClick} {...props}>
      {children}
    </ShadcnButton>
  );
}
