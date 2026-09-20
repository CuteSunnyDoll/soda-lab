/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        soda: {
          azure: '#0284C7',
          sky: '#38BDF8',
          ocean: '#0369A1',
          coral: '#F43F5E',
          ruby: '#E11D48',
          orange: '#F97316',
          citrus: '#F59E0B',
          lemon: '#EAB308',
          lime: '#84CC16',
          mint: '#10B981',
          berry: '#9333EA',
          lavender: '#8B5CF6',
          cream: '#FFFBEB',
          vanilla: '#FEF3C7',
          spritz: '#FF7A59',
          darkBg: '#0F172A',
          darkCard: '#1E293B',
          darkBorder: '#334155'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Noto Sans TC', 'Noto Sans SC', 'Noto Sans JP', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
