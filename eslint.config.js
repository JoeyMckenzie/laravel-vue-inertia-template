import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  vue: true,
}, ...tailwind.configs['flat/recommended'], {
  settings: {
    tailwindcss: {
      config: 'tailwind.config.ts', // returned from `loadConfig()` utility if not provided
      cssFiles: [
        'resources/css/app.css',
      ],
    },
  },
})
