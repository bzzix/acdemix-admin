<template>
  <h1>{{ $t('privacy') }}</h1>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  permission: 'settings_privacy_view',
  title: () => useI18n().t('privacy')
})
</script>
