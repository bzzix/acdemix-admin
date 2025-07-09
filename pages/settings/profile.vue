<template>
  <h1>{{ $t('profile') }}</h1>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  permission: 'settings_profile_view',
  title: () => useI18n().t('profile')
})
</script>
