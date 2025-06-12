// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
    },
    extend: {
      colors: {
        customPrincipalClaro: "#fef8ee",
        customRed: "#F43F5E",
        customBlue: "#1E40AF",
        'btn-edit-background': 'var(--btn-edit-background)',
        'btn-edit-hover':      'var(--btn-edit-hover)',
        'btn-delete-background': 'var(--btn-delete-background)',
        'btn-delete-hover':      'var(--btn-delete-hover)',
      },
      fontFamily: {
        serif: ['IBM Plex Serif', 'serif'],
        roboto: ['Roboto', 'roboto']
      },
    },
  },
  plugins: [],
};
