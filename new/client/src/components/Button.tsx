import React from 'react';
import { Color } from './color';
import { useNavigate } from 'react-router-dom';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => any;
  color?: Color;
  size?: ButtonSize;
  to?: string;
}

type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

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
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
