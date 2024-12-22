import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`cosmic-border bg-[#1a1a1a] bg-opacity-50 backdrop-blur-md p-6 ${className}`}>
      {children}
    </div>
  );
}