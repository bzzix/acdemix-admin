<template>
  <li
    class="nav-item"
    :class="{ active: isActive, dropdown: hasChildren, 'show': hasChildren && isOpen }"
    @mouseleave="isOpen = false"
  >
    <template v-if="hasChildren">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        @click.prevent="toggleDropdown"
        :aria-expanded="isOpen ? 'true' : 'false'"
      >
        <span class="nav-link-icon d-md-none d-lg-inline-block" v-if="item.icon" v-html="item.icon"></span>
        <span class="nav-link-title">{{ $t(item.title) }}</span>
      </a>
      <div class="dropdown-menu" :class="{ show: isOpen }">
        <div class="dropdown-menu-columns">
          <div class="dropdown-menu-column">
            <SidebarMenuItem
              v-for="child in item.children"
              :key="child.key"
              :item="child"
              :current-route="currentRoute"
              :user="user"
              @logout="$emit('logout')"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <NuxtLink
        v-if="item.to"
        class="nav-link"
        :to="item.to"
        :class="{ active: isActive }"
      >
        <span class="nav-link-icon d-md-none d-lg-inline-block" v-if="item.icon" v-html="item.icon"></span>
        <span class="nav-link-title">{{ $t(item.title) }}</span>
      </NuxtLink>
      <a
        v-else-if="item.action === 'logout'"
        href="#"
        class="nav-link"
        style="color: red"
        @click.prevent="$emit('logout')"
      >
        <span class="nav-link-icon d-md-none d-lg-inline-block" v-if="item.icon" v-html="item.icon"></span>
        <span class="nav-link-title"><b>{{ $t(item.title) }}</b></span>
      </a>
      <a
        v-else
        class="nav-link"
        href="javascript:void(0)"
      >
        <span class="nav-link-icon d-md-none d-lg-inline-block" v-if="item.icon" v-html="item.icon"></span>
        <span class="nav-link-title">{{ $t(item.title) }}</span>
      </a>
    </template>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps({
  item: { type: Object, required: true },
  currentRoute: { type: [String, null], default: null },
  user: { type: Object, default: null }
})
const isOpen = ref(false)
const hasChildren = computed(() => Array.isArray(props.item.children) && props.item.children.length > 0)
const isActive = computed(() => {
  if (props.item.to && props.currentRoute) {
    return props.item.to === '/' ? props.currentRoute === 'index' : props.currentRoute?.includes(props.item.key)
  }
  if (hasChildren.value) {
    return props.item.children.some((child: any) => child.to && props.currentRoute?.includes(child.key))
  }
  return false
})
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.nav-item.active > .nav-link,
.nav-link.active {
  background: var(--bs-primary-bg-subtle, #f0f0f0);
  font-weight: bold;
}
.dropdown-menu {
  min-width: 200px;
}
</style>
