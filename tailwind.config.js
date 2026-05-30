/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#A7C636',
          dark: '#8DA82B',
          light: '#C2DE5A',
        },
        surface: {
          light: '#FAFAFA',
          dark: '#111113',
          card: {
            light: '#FFFFFF',
            dark: '#1A1A1D',
          },
          muted: {
            light: '#F0F0F0',
            dark: '#222225',
          }
        },
        text: {
          primary: {
            light: '#2A2C2E',
            dark: '#F0F0F0',
          },
          secondary: {
            light: '#595959',
            dark: '#9A9A9A',
          },
          muted: {
            light: '#888888',
            dark: '#666666',
          }
        },
        border: {
          light: '#E0E0E0',
          dark: '#2A2C2E',
        }
      },
      fontFamily: {
        sans: ['"SUITE Variable"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', fontWeight: '700' }],
        'heading': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'subheading': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        'section': 'clamp(80px, 10vh, 120px)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'scroll-down': 'scrollDown 2s infinite',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'slideInUp': 'slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        scrollDown: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
}
