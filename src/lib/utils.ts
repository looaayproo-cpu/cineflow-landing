import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Spring transition presets for Framer Motion
export const smoothSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const gentleSpring = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
};

export const snappySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};
