/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4F46E5',
          'primary-hover': '#4338CA',
          secondary: '#7C3AED',
          'secondary-hover': '#6D28D9',
          accent: '#2563EB',
          'accent-hover': '#1D4ED8',
          bg: '#F8FAFC',
          text: '#0F172A',
          muted: '#64748B',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
        'premium': '0 10px 30px -5px rgba(79, 70, 229, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'glow': '0 0 25px -5px rgba(79, 70, 229, 0.35)',
        'card-hover': '0 20px 35px -10px rgba(79, 70, 229, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.05)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      }
    },
  },
  plugins: [],
}
