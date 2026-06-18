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
            ចុះឈ្មោះជាសមាជិក
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            បង្កើតគណនីថ្មីដើម្បីចាប់ផ្តើមទិញទំនិញ
          </p>
        </div>
  
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <XCircle class="w-6 h-6 text-red-500 flex" />
          <span>{{ errorMessage }}</span>
        </div>
  
        <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <form @submit.prevent="handleRegister" class="space-y-5">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                នាមត្រកូល និងនាមខ្លួន
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  v-model="registerForm.fullName"
                  type="text"
                  required
                  class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="សុខា ម៉ាលី"
                />
              </div>
            </div>
  
            <div>
              <label for="reg-email" class="block text-sm font-medium text-gray-700 mb-2">
                អ៊ីមែល
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="reg-email"
                  v-model="registerForm.email"
                  type="email"
                  required
                  class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="dastore@gmail.com"
                />
              </div>
            </div>
  
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                លេខទូរស័ព្ទ
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  v-model="registerForm.phone"
                  type="tel"
                  required
                  class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="089 78 43 18"
                />
              </div>
            </div>
  
            <div>
              <label for="reg-password" class="block text-sm font-medium text-gray-700 mb-2">
                លេខសម្ងាត់
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="reg-password"
                  v-model="registerForm.password"
                  required
                  minlength="6"
                  class="appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder=".........."
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
              <p class="mt-1 text-xs text-gray-500">
                លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 6 តួអក្សរ
              </p>
            </div>
  
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                បញ្ជាក់លេខសម្ងាត់
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Check class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="registerForm.confirmPassword"
                  required
                  class="appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="........"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye 
                    v-if="!showConfirmPassword" 
                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                  />
                  <EyeOff 
                    v-else 
                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                  />
                </button>
              </div>
              <p v-if="passwordMismatch" class="mt-1 text-xs text-red-500">
                លេខសម្ងាត់មិនត្រូវគ្នា
              </p>
            </div>
  
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="registerForm.agreeTerms"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="text-gray-700">
                  ខ្ញុំយល់ព្រមនឹង
                  <a href="#" class="font-medium text-green-600 hover:text-green-500 transition">
                    លក្ខខណ្ឌប្រើប្រាស់
                  </a>
                  និង
                  <a href="#" class="font-medium text-green-600 hover:text-green-500 transition">
                    គោលការណ៍ឯកជនភាព
                  </a>
                </label>
              </div>
            </div>
  
            <button
              type="submit"
              :disabled="isLoading || passwordMismatch"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-black bg-gradient hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="isLoading" class="animate-spin mr-2 h-5 w-5" />
              <span v-else>ចុះឈ្មោះ</span>
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
              <span class="text-gray-700 font-medium">ចុះឈ្មោះជាមួយ Google</span>
            </button>
            
            <button
              type="button"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition duration-150"
            >
              <Facebook class="h-6 w-6 text-blue-600" />
              <span class="text-gray-700 font-medium">ចុះឈ្មោះជាមួយ Facebook</span>
            </button>
          </div>
  
          <div class="text-center">
            <p class="text-sm text-gray-600">
              មានគណនីរួចហើយ?
              <RouterLink to="/login" class="font-medium text-green-600 hover:text-green-500 transition">
                ចូលគណនី
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
  import { ref, reactive, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { 
    Sprout, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    Loader2,
    Chrome,
    Facebook,
    User,
    Phone,
    Check,
    XCircle
  } from 'lucide-vue-next'
  
  const router = useRouter()
  
  const registerForm = reactive({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  
  const isLoading = ref(false)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const errorMessage = ref('')
  
  const passwordMismatch = computed(() => {
    return registerForm.password !== '' && 
           registerForm.confirmPassword !== '' && 
           registerForm.password !== registerForm.confirmPassword
  })
  
  const handleRegister = async () => {
    if (passwordMismatch.value) {
      errorMessage.value = 'សូមបញ្ចូលលេខសម្ងាត់ឱ្យត្រូវគ្នា!'
      return
    }
  
    if (!registerForm.agreeTerms) {
      errorMessage.value = 'សូមយល់ព្រមនឹងលក្ខខណ្ឌប្រើប្រាស់!'
      return
    }
  
    isLoading.value = true
    errorMessage.value = ''
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Register data:', registerForm)
      router.push({ 
        path: '/login',
        query: { registered: 'true' }
      })
    } catch (error) {
      console.error('Register error:', error)
      errorMessage.value = 'មានបញ្ហាក្នុងការចុះឈ្មោះ។ សូមព្យាយាមម្តងទៀត។'
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