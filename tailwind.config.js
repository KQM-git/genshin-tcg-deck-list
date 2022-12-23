/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}'
    ],
    theme: {
        extend: {
            fontFamily: {
                genshin: ['SDK SC']
            },
            colors: {
                'kqm-purple': '#9457C3',
                whale: '#DCB131',
                verified: '#22C55E',
                unverified: '#F87171'
            }
        }
    },
    plugins: []
}
