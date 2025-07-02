<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" placeholder="البريد الإلكتروني" />
    <input v-model="password" type="password" placeholder="كلمة المرور" />
    <button>إنشاء حساب</button>
  </form>
</template>

<script setup>
const email = ref('')
const password = ref('')
const { post } = useApi()

const handleLogin = async () => {
  const res = await post('admin/login', { email: email.value, password: password.value })
  useCookie('admin_token').value = res.token
  await navigateTo('/')
}
</script>
