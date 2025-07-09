<template>
  <h1>{{ $t('stripe') }}</h1>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

definePageMeta({
  permission: 'payment_gateways_stripe_view',
  title: () => useI18n().t('stripe')
})
</script>
