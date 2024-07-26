// plugins/initials.ts
export default defineNuxtPlugin(nuxtApp => {
  // Function to get initials from a full name
  const getInitials = (fullName: string): string => {
    return fullName
    .split(' ')
    .map(name => name[0].toUpperCase())
    .join('');
  };

  // Provide the function to the Nuxt app instance
  nuxtApp.provide('getInitials', getInitials);
});
