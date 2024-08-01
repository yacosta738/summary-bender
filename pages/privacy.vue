<script setup lang="ts">
import AppHeader from "~/components/dashboard/AppHeader.vue";
import AppContainer from "~/components/dashboard/AppContainer.vue";
</script>

<template>
  <NuxtLayout>
    <AppContainer>
      <AppHeader/>
      <div class="privacy-container">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.
        </p>
        <h2>Information Collection</h2>
        <p>
          We collect information that you provide to us directly, such as when you create an account, update your profile, or use our services.
        </p>
        <h2>Use of Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users.
        </p>
        <h2>Information Sharing</h2>
        <p>
          We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.
        </p>
        <h2>Data Security</h2>
        <p>
          We implement security measures to protect your information from unauthorized access, use, or disclosure.
        </p>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website.
        </p>
        <p>
          If you have any questions about this privacy policy, please contact our support team.
        </p>
      </div>
    </AppContainer>
  </NuxtLayout>
</template>

<style scoped>
.privacy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
  line-height: 1.6;
}
</style>
