import { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  :root {
    --font-serif: 'Playfair Display', serif;
    --font-sans: 'Poppins', sans-serif;
  }
`;

export const fontClasses = {
  serif: 'font-serif',
  sans: 'font-sans'
};

// These color variables will be used across the app
export const colorClasses = {
  gold: 'text-[#D4AF37]',
  maroon: 'text-[#800000]',
  beige: 'text-[#F5F5DC]',
  offwhite: 'text-[#FAFAF5]',
  darkbrown: 'text-[#3A3238]',
};

export const bgColorClasses = {
  gold: 'bg-[#D4AF37]',
  maroon: 'bg-[#800000]',
  beige: 'bg-[#F5F5DC]',
  offwhite: 'bg-[#FAFAF5]',
  darkbrown: 'bg-[#3A3238]',
  goldLight: 'bg-[#D4AF37]/10',
};

export const borderColorClasses = {
  gold: 'border-[#D4AF37]',
  maroon: 'border-[#800000]',
  beige: 'border-[#F5F5DC]',
  offwhite: 'border-[#FAFAF5]',
  darkbrown: 'border-[#3A3238]',
};

export const hoverClasses = {
  gold: 'hover:text-[#D4AF37]',
  maroon: 'hover:text-[#800000]',
  bgGold: 'hover:bg-[#D4AF37]',
  bgMaroon: 'hover:bg-[#800000]',
};
