/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}','./app/**/*.{js,ts,tsx}' , './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#245A3F',
        'primary-lowlight': '',
        pastel: {
          green: '#CEEACA',
          purple: '#CEC8DC',
          highlight: {
            green: '#7C9A79',
            purple: '#7A799A'
          }
        },
        levels: {
          one: '#6BCD5E',
          two: '#73C35D',
          three: '#72B55A',
          four: '#88A557',
          five: '#99A557',
          six: '#A59057',
          seven: '#A57F57',
          eight: '#A56E57',
          nine: '#A45B51',
          ten: '#984646'
        }
      }
    },
  },
  plugins: [],
};
