/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.{edge,js,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      // colors:{
      //   'primary':'#dc2626',
      //   'white':'#ffffff',
      //   'black':'#0a0a0a',
      //   'yellow':'#facc15',
      //   'orange':'#fb923c',
      //   'amber':'#fde68a'
      // }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

