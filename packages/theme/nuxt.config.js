import webpack from 'webpack';

const mapsKey = process.env.MAPS_KEY
  ? process.env.MAPS_KEY
  : 'AIzaSyCE5_1vSXIap5MmYA4qWwHPQRpyDckvfVU';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  generate: {
    fallback: true
  },
  head: {
    title: 'Beckn storefront',
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places`,
        async: true,
        defer: true
      }
    ],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href:
          'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700%7CRoboto:300,300i,400,400i,500,700&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700%7CRoboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: "this.media='all'",
        once: true
      }
    ],
    css: ['@/assets/styles.scss']
  },
  loading: { color: '#fff' },
  plugins: [],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        // @core-development-only-start
        coreDevelopment: true,
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/beckn', '@vue-storefront/core'],
          prod: ['@vue-storefront/beckn', '@vue-storefront/core']
        }
      }
    ],
    // @core-development-only-start
    [
      '@vue-storefront/nuxt-theme',
      {
        generate: {
          replace: {
            apiClient: '@vue-storefront/beckn-api',
            composables: '@vue-storefront/beckn'
          }
        }
      }
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/beckn/nuxt', {}]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyD3167CzM1Nyv-zf52QShv0PDWq8Dze8gk',
          authDomain: 'reference-apps-authentication.firebaseapp.com',
          projectId: 'reference-apps-authentication',
          storageBucket: 'reference-apps-authentication.appspot.com',
          messagingSenderId: '153318683305',
          appId: '1:153318683305:web:868f8277dc93a05b52afb8'
        },
        services: {
          auth: {
            persistence: 'local',
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: false
          }
          // auth: true
        }
      }
    ]
  ],

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome 1'
        },
        de: {
          welcome: 'Welcome 2'
        }
      }
    }
  },
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {
        paths: [process.cwd()]
      })
    ]
  },
  build: {
    transpile: ['vee-validate/dist/rules'],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  router: {
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  }
};
