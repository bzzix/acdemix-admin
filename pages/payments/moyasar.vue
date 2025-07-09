<template>
    <h1>{{ $t('moyasar') }}</h1>
</template>

<script setup>
    import { useI18n } from 'vue-i18n'

    definePageMeta({
        permission: 'payment_gateways_moyasar_view',
        title: () => useI18n().t('moyasar')
    })
</script>
