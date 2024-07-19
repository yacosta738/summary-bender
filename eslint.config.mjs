import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  rules: {

  }
}).override('nuxt/vue/rules', {
  rules: {
    // ...Override rules, for example:
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/one-component-per-file': 'off',
  }
}).override('nuxt/typescript/rules', {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
})
