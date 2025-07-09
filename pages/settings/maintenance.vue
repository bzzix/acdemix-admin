<template>
  <h1>{{ $t('maintenanceMode') }}</h1>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  permission: 'settings_maintenance_view',
  title: () => useI18n().t('maintenanceMode')
})
</script>
