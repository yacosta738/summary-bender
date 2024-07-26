declare module '#app' {
  interface NuxtApp {
    $getInitials (msg: string): string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $getInitials (msg: string): string
  }
}

export {}
