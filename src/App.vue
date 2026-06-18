<template>
  <div>
    <Navbar />
    <div class="pt-6">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>