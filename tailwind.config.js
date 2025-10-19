/** tailwind.config.js */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#00e5ff',
          soft: '#66f0ff',
        },
        bg: '#071024',
        surface: '#0b1522',
        muted: '#98a0b3',
      },
      fontFamily: {
        // 기본 폰트는 layout.tsx에서 주입된 CSS 변수(Geist) 사용, fallback은 시스템 폰트
        sans: [
          'var(--font-geist-sans)',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
