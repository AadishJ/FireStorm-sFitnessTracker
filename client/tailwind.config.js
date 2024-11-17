/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        backPurple: "#180030",
        lightPurple: "#502B75",
        brightPurple: "#7F00FF", 
        profilePurple: "#8900E5",
        textPurple: "#8000FF",
        newPurple: "#7F00FF",
        anotherPurple: "#2E005C",
        somePurple: "#5800B0",
        footerPurple: "#26023F",
        pinkPurple: "#630DB2",
        imagePink: "#341647",
        backLightPurple: "#270050",
        cyan: "#00C2C2",
        customYellow: "#5237BF",
        customGray: "#D3D3D3",
        customGray2: "#A7A7A7",
        test: "#e600e6",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },backgroundImage: {
        'cyan-gradient': 'linear-gradient(to bottom, #027C7C, #008080)',
        'customGray-gradient': 'linear-gradient(to bottom, #A7A7A7, #A9A9A9)',
        'customYellow-gradient': 'linear-gradient(to bottom, #5237BF, #3A2A8C)',
      },plugins: [
        require('tailwind-scrollbar'),
      ],blur: {
        '4xl': '40px',
        '5xl': '50px',
        '6xl': '150px',
      },
    },
  },
  plugins: [],
}