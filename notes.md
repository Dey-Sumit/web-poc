1. download the boilerplate
   https://reactjsexample.com/create-a-new-project-with-vite-react-js-typescript-eslint-prettier-in-just-1-second/

2. add tailwind

```
yarn add tailwindcss postcss autoprefixer -D
npx tailwindcss init -p

----
tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

```
