<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <RouterLink to="/home" class="flex items-center gap-2 hover:opacity-80 transition">
            <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Sprout class="h-6 w-6 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-800">DASTORE</span>
          </RouterLink>
  
          <div class="hidden md:flex items-center gap-8">
            <RouterLink 
              to="/home" 
              class="text-gray-600 hover:text-green-600 transition font-medium"
              active-class="text-green-600"
            >
              ផ្ទះ
            </RouterLink>
            <RouterLink 
              to="/shop" 
              class="text-gray-600 hover:text-green-600 transition font-medium"
              active-class="text-green-600"
            >
              ហាង
            </RouterLink>
            <RouterLink 
              to="/about" 
              class="text-gray-600 hover:text-green-600 transition font-medium"
              active-class="text-green-600"
            >
              អំពីយើង
            </RouterLink>
            <RouterLink 
              to="/contact" 
              class="text-gray-600 hover:text-green-600 transition font-medium"
              active-class="text-green-600"
            >
              ទំនាក់ទំនង
            </RouterLink>
          </div>
  
          <div class="flex items-center gap-3">
            <div v-if="isAuthenticated" class="hidden md:flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">{{ userInitial }}</span>
              </div>
              <span class="text-gray-700 font-medium">{{ userName }}</span>
            </div>
  
            <div v-if="!isAuthenticated" class="hidden md:flex items-center gap-2">
              <RouterLink to="/login">
                <button class="px-5 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition font-medium text-sm">
                  ចូលគណនី
                </button>
              </RouterLink>
              <RouterLink to="/register">
                <button class="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm shadow-sm hover:shadow">
                  ចុះឈ្មោះ
                </button>
              </RouterLink>
            </div>
  
            <button 
              v-if="isAuthenticated"
              @click="handleLogout" 
              class="hidden md:flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition font-medium text-sm"
            >
              <LogOut class="h-4 w-4" />
              ចាកចេញ
            </button>
  
            <button 
              @click="toggleMobileMenu" 
              class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu v-if="!mobileMenuOpen" class="h-6 w-6 text-gray-600" />
              <X v-else class="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
  
        <transition 
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-100">
            <div class="flex flex-col space-y-1">
              <RouterLink 
                to="/home" 
                class="px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                @click="mobileMenuOpen = false"
              >
                ផ្ទះ
              </RouterLink>
              <RouterLink 
                to="/shop" 
                class="px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                @click="mobileMenuOpen = false"
              >
                ហាង
              </RouterLink>
              <RouterLink 
                to="/about" 
                class="px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                @click="mobileMenuOpen = false"
              >
                អំពីយើង
              </RouterLink>
              <RouterLink 
                to="/contact" 
                class="px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
                @click="mobileMenuOpen = false"
              >
                ទំនាក់ទំនង
              </RouterLink>
  
              <div class="border-t border-gray-100 my-2"></div>
  
              <div v-if="!isAuthenticated" class="px-4 space-y-2">
                <RouterLink to="/login" @click="mobileMenuOpen = false">
                  <button class="w-full px-4 py-2.5 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition font-medium">
                    ចូលគណនី
                  </button>
                </RouterLink>
                <RouterLink to="/register" @click="mobileMenuOpen = false">
                  <button class="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                    ចុះឈ្មោះ
                  </button>
                </RouterLink>
              </div>
  
              <div v-else class="px-4 space-y-2">
                <div class="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-lg">
                  <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-sm">{{ userInitial }}</span>
                  </div>
                  <span class="text-gray-700 font-medium">{{ userName }}</span>
                </div>
                <button 
                  @click="handleLogout" 
                  class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition font-medium"
                >
                  <LogOut class="h-4 w-4" />
                  ចាកចេញ
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Sprout, Menu, X, LogOut } from 'lucide-vue-next'
  
  const router = useRouter()
  const mobileMenuOpen = ref(false)
  const user = ref(null)
  
  const isAuthenticated = computed(() => {
    return localStorage.getItem('user') !== null
  })
  
  const userName = computed(() => {
    if (user.value) {
      return user.value.name || 'អ្នកប្រើប្រាស់'
    }
    return 'អ្នកប្រើប្រាស់'
  })
  
  const userInitial = computed(() => {
    if (user.value && user.value.name) {
      return user.value.name.charAt(0).toUpperCase()
    }
    return 'U'
  })
  
  onMounted(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
    }
  })
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    user.value = null
    mobileMenuOpen.value = false
    router.push('/home')
  }
  </script>
  
  <style scoped>
  .router-link-active {
    color: #16a34a;
  }
  
  .transition {
    transition: all 0.2s ease;
  }
  </style>