import React from 'react';

export interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div>{children}</div>;
}
