<template>
  <h1>{{ $t('security') }}</h1>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  permission: 'settings_security_view',
  title: () => useI18n().t('security')
})
</script>
