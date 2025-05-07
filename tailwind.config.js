// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],// Asegúrate de incluir la ruta correcta a tus archivos
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
    },
    extend: {
      colors: {
        customPrincipalClaro: "#fef8ee",
        customRed: "#F43F5E",
        customBlue: "#1E40AF", // Puedes agregar más colores
      },
      fontFamily: {
        serif: ['IBM Plex Serif', 'serif'], // Agregar la fuente
        roboto: ['Roboto', 'roboto']
      },
    },
  },
  plugins: [],
};
