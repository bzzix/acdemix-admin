<template>
    <h1>{{ $t('generalSettings') }}</h1>
</template>


<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  permission: 'settings_view',
  title: () => useI18n().t('generalSettings')
})
</script>
