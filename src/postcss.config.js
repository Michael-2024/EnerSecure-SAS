module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};


ADD FILE: /index.css
css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* You can add custom global styles here if needed */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}