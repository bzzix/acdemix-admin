<template>
  <div class="public-layout">
    <header class="public-header">
      <NuxtLink to="/" class="public-logo">
        <img v-if="appLogo" :src="appLogo" height="36" alt="logo" />
        <span v-else>{{ appName }}</span>
      </NuxtLink>
    </header>
    <main class="public-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const appLogo = typeof config.public?.appLogo === 'string' ? config.public.appLogo : ''
const appName = config.public?.appName || 'Acdemix'
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}
.public-header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  text-align: center;
}
.public-logo img {
  max-height: 36px;
}
.public-main {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.public-footer {
  background: #fff;
  border-top: 1px solid #e5e7eb;
}
</style>
