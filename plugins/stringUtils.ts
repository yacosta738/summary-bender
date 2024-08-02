// plugins/initials.ts

export default defineNuxtPlugin({
  name: 'getInitials',
  parallel: true,
  async setup (nuxtApp) {
    const getInitials = (fullName: string): string => {
      if (!fullName) return '';
      return fullName
      .split(' ')
      .map(name => name[0].toUpperCase())
      .join('');
    };

    // Provide the function to the Nuxt app instance
    nuxtApp.provide('getInitials', getInitials);
  }
})
