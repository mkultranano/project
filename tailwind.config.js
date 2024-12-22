/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FACC15',
        secondary: '#9333EA',
        background: '#000000',
        card: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '25px',
        md: '15px',
        sm: '10px',
      },
      spacing: {
        lg: '20px',
        md: '15px',
        sm: '10px',
        xs: '5px',
      },
    },
  },
  plugins: [],
};