/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
      },
      boxShadow: {
        secondary: "10px 10px 20px  rgba(2,2,2,0.25)",
        additions: '0 35px 60px -15px rgba(1, 1, 1, 0.3)',
      },
      keyframes:{
        shimmer:{
          '100%': {
        transform: 'translateX(100%)',
      },
        }
      },
    },
  },
  plugins: [],
}
