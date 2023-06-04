/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // @tailwind base; 는
    // Tailwind CSS의 Preflight라는 기능을 사용하는데
    // 이걸 비활성화시키는 코드임.
    // preflight가 true이면 tailwind 사용, false이면 tailwind 미사용
    preflight: true
  },
  mode: 'jit', // tailwind 업그레이드 버전 설치하고 추가한 코드
  darkMode: 'media', // tailwind 업그레이드 버전 설치하고 추가한 코드
  content: [ 
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './src/styles/custom.css',
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
    },
  },
  plugins: [],
};