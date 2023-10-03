export default {
    // Allows testing on mobile
    server: {
        port: 3000,
        host: '0.0.0.0'
    },

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Genshin Impact TCG Guides',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: "Curated deck guides for Genshin Impact's collectible card minigame, Genius Invokation TCG."
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            },
            {
                hid: 'og:title',
                name: 'og:title',
                content: 'Genshin Impact TCG Guides'
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content: "Curated deck guides for Genshin Impact's collectible card minigame, Genius Invokation TCG."
            },
            {
                hid: 'og:type',
                name: 'og:type',
                content: 'article'
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: '/favicon.ico'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://cards.keqingmains.com/'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxt/postcss8'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/content
        '@nuxt/content'
    ],

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {
        liveEdit: false,
        fullTextSearchFields: ['name', 'description']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {}
            }
        },
        loaders: {
            css: {
                modules: false
            }
        }
    },
    ignore: [process.env.NODE_ENV === 'production' && 'pages/test.vue']
}
