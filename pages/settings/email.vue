<template>
  <h1>{{ $t('emailSettings') }}</h1>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  permission: 'settings_email_view',
  title: () => useI18n().t('emailSettings')
})
</script>
