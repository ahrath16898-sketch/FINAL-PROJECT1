<template>
    <div class="min-h-screen bg-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div class="flex justify-center">
            <div class="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Sprout class="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            ស្វាគមន៍មកកាន់ DASTORE
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            ចូលគណនីរបស់អ្នកដើម្បីបន្ត
          </p>
        </div>
  
        <div v-if="registerSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle class="w-6 h-6 text-green-500 flex" />
          <span>ចុះឈ្មោះដោយជោគជ័យ! សូមចូលគណនីរបស់អ្នក។</span>
        </div>
  
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <XCircle class="w-6 h-6 text-red-500 flex" />
          <span>{{ errorMessage }}</span>
        </div>
  
        <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                អ៊ីមែល
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="dastore@gmail.com"
                />
              </div>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                លេខសម្ងាត់
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="loginForm.password"
                  required
                  class="appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye 
                    v-if="!showPassword" 
                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                  />
                  <EyeOff 
                    v-else 
                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                  />
                </button>
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="loginForm.remember"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  ចងចាំខ្ញុំ
                </label>
              </div>
              <div class="text-sm">
                <RouterLink to="/reset-password" class="font-medium text-green-600 hover:text-green-500 transition">
                  ភ្លេចលេខសម្ងាត់?
                </RouterLink>
              </div>
            </div>
  
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-blackgit bg-gradient hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="isLoading" class="animate-spin mr-2 h-5 w-5" />
              <span v-else>ចូលគណនី</span>
            </button>
          </form>
  
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                ឬ
              </span>
            </div>
          </div>
  
          <div class="space-y-3">
            <button
              type="button"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition duration-150"
            >
              <Chrome class="h-6 w-6" />
              <span class="text-gray-700 font-medium">ចូលជាមួយ Google</span>
            </button>
            
            <button
              type="button"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition duration-150"
            >
              <Facebook class="h-6 w-6 text-blue-600" />
              <span class="text-gray-700 font-medium">ចូលជាមួយ Facebook</span>
            </button>
          </div>
  
          <div class="text-center">
            <p class="text-sm text-gray-600">
              មិនទាន់មានគណនី?
              <RouterLink to="/register" class="font-medium text-green-600 hover:text-green-500 transition">
                ចុះឈ្មោះ
              </RouterLink>
            </p>
          </div>
        </div>
  
        <div class="text-center">
          <p class="text-xs text-gray-500">
            &copy; 2024 DASTORE. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { 
    Sprout, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    Loader2,
    Chrome,
    Facebook,
    CheckCircle,
    XCircle
  } from 'lucide-vue-next'
  
  const router = useRouter()
  const route = useRoute()
  
  const loginForm = reactive({
    email: '',
    password: '',
    remember: false
  })
  
  const isLoading = ref(false)
  const showPassword = ref(false)
  const errorMessage = ref('')
  const registerSuccess = ref(false)
  
  onMounted(() => {
    if (route.query.registered === 'true') {
      registerSuccess.value = true
      setTimeout(() => {
        registerSuccess.value = false
      }, 5000)
    }
  })
  
  const handleLogin = async () => {
    isLoading.value = true
    errorMessage.value = ''
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Login data:', loginForm)
      
      localStorage.setItem('user', JSON.stringify({
        email: loginForm.email,
        name: 'អ្នកប្រើប្រាស់'
      }))
      
      const redirectPath = route.query.redirect || '/home'
      router.push(redirectPath)
    } catch (error) {
      console.error('Login error:', error)
      errorMessage.value = 'មានបញ្ហាក្នុងការចូលគណនី។ សូមពិនិត្យអ៊ីមែល និងលេខសម្ងាត់របស់អ្នក។'
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  </style>