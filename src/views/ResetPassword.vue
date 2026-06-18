<template>
    <div class="min-h-screen bg-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <div class="flex justify-center">
            <div class="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
              <KeyRound class="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            {{ currentStep === 'request' ? 'ស្ដារលេខសម្ងាត់' : 'កំណត់លេខសម្ងាត់ថ្មី' }}
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            {{ currentStep === 'request' ? 'បញ្ចូលអ៊ីមែលរបស់អ្នកដើម្បីទទួលបានតំណស្ដារលេខសម្ងាត់' : 'សូមបញ្ចូលលេខសម្ងាត់ថ្មីរបស់អ្នក' }}
          </p>
        </div>
  
        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle class="w-6 h-6 text-green-500 flex" />
          <span>{{ successMessage }}</span>
        </div>
  
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <XCircle class="w-6 h-6 text-red-500 flex" />
          <span>{{ errorMessage }}</span>
        </div>
  
        <div v-if="currentStep === 'request'" class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <form @submit.prevent="requestReset" class="space-y-6">
            <div>
              <label for="reset-email" class="block text-sm font-medium text-gray-700 mb-2">
                អ៊ីមែល
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="reset-email"
                  v-model="resetForm.email"
                  type="email"
                  required
                  class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="dastore@gmail.com"
                />
              </div>
              <p class="mt-2 text-xs text-gray-500">
                យើងនឹងផ្ញើតំណស្ដារលេខសម្ងាត់ទៅកាន់អ៊ីមែលរបស់អ្នក
              </p>
            </div>
  
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-white bg-gradient hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="isLoading" class="animate-spin mr-2 h-5 w-5" />
              <span v-else>ផ្ញើតំណស្ដារលេខសម្ងាត់</span>
            </button>
          </form>
  
          <div class="text-center">
            <p class="text-sm text-gray-600">
              ចងចាំលេខសម្ងាត់ហើយ?
              <RouterLink to="/login" class="font-medium text-green-600 hover:text-green-500 transition">
                ចូលគណនី
              </RouterLink>
            </p>
          </div>
        </div>
  
        <div v-else-if="currentStep === 'reset'" class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <form @submit.prevent="resetPassword" class="space-y-6">
            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700 mb-2">
                លេខសម្ងាត់ថ្មី
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  id="new-password"
                  v-model="resetForm.newPassword"
                  required
                  minlength="6"
                  class="appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder=".........."
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye 
                    v-if="!showNewPassword" 
                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                  />
                  <EyeOff 
                    v-else 
                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
                  />
                </button>
              </div>
              <div class="mt-2 space-y-1">
                <p class="text-xs text-gray-500">
                  លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 6 តួអក្សរ
                </p>
                <div class="flex gap-1">
                  <div 
                    v-for="i in 4" 
                    :key="i"
                    class="h-1 flex-1 rounded-full transition-all duration-300"
                    :class="getPasswordStrengthClass(i)"
                  ></div>
                </div>
              </div>
            </div>
  
            <div>
              <label for="confirm-new-password" class="block text-sm font-medium text-gray-700 mb-2">
                បញ្ជាក់លេខសម្ងាត់ថ្មី
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Check class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  :type="showConfirmNewPassword ? 'text' : 'password'"
                  id="confirm-new-password"
                  v-model="resetForm.confirmNewPassword"
                  required
                  class="appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150"
                  placeholder="........"
                />
                <button
                  type="button"
                  @click="showConfirmNewPassword = !showConfirmNewPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye 
                    v-if="!showConfirmNewPassword" 
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
  
            <button
              type="submit"
              :disabled="isLoading || passwordMismatch"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-white bg-gradient hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="isLoading" class="animate-spin mr-2 h-5 w-5" />
              <span v-else>កំណត់លេខសម្ងាត់ថ្មី</span>
            </button>
          </form>
  
          <div class="text-center">
            <p class="text-sm text-gray-600">
              ចងចាំលេខសម្ងាត់ហើយ?
              <RouterLink to="/login" class="font-medium text-green-600 hover:text-green-500 transition">
                ចូលគណនី
              </RouterLink>
            </p>
          </div>
        </div>
  
        <div v-else-if="currentStep === 'success'" class="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle class="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">ស្ដារលេខសម្ងាត់ដោយជោគជ័យ!</h3>
          <p class="text-gray-600">
            លេខសម្ងាត់របស់អ្នកត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ។
            អ្នកអាចចូលគណនីរបស់អ្នកជាមួយលេខសម្ងាត់ថ្មីបានហើយ។
          </p>
          <RouterLink
            to="/login"
            class="inline-block w-full py-3 px-4 border border-transparent rounded-xl shadow-lg text-white bg-gradient hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 font-medium text-lg text-center"
          >
            ចូលគណនី
          </RouterLink>
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
  import { ref, reactive, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { 
    KeyRound,
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    Loader2,
    Check,
    CheckCircle,
    XCircle
  } from 'lucide-vue-next'
  
  const router = useRouter()
  
  const currentStep = ref('request')
  const isLoading = ref(false)
  const showNewPassword = ref(false)
  const showConfirmNewPassword = ref(false)
  const successMessage = ref('')
  const errorMessage = ref('')
  
  const resetForm = reactive({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  
  const passwordMismatch = computed(() => {
    return resetForm.newPassword !== '' && 
           resetForm.confirmNewPassword !== '' && 
           resetForm.newPassword !== resetForm.confirmNewPassword
  })
  
  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (password.match(/[a-z]/)) strength++
    if (password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++
    return Math.min(strength, 4)
  }
  
  const getPasswordStrengthClass = (index) => {
    const strength = getPasswordStrength(resetForm.newPassword)
    if (index <= strength) {
      if (strength <= 1) return 'bg-red-500'
      if (strength <= 2) return 'bg-yellow-500'
      if (strength <= 3) return 'bg-blue-500'
      return 'bg-green-500'
    }
    return 'bg-gray-200'
  }
  
  const requestReset = async () => {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Reset request for:', resetForm.email)
      successMessage.value = 'តំណស្ដារលេខសម្ងាត់ត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នក!'
      setTimeout(() => {
        successMessage.value = ''
        currentStep.value = 'reset'
      }, 2000)
    } catch (error) {
      console.error('Reset request error:', error)
      errorMessage.value = 'មានបញ្ហាក្នុងការផ្ញើតំណស្ដារលេខសម្ងាត់។ សូមពិនិត្យអ៊ីមែលរបស់អ្នក។'
    } finally {
      isLoading.value = false
    }
  }
  
  const resetPassword = async () => {
    if (passwordMismatch.value) {
      errorMessage.value = 'សូមបញ្ចូលលេខសម្ងាត់ឱ្យត្រូវគ្នា!'
      return
    }
  
    if (resetForm.newPassword.length < 6) {
      errorMessage.value = 'លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 6 តួអក្សរ!'
      return
    }
  
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Password reset successful')
      currentStep.value = 'success'
      resetForm.newPassword = ''
      resetForm.confirmNewPassword = ''
    } catch (error) {
      console.error('Reset password error:', error)
      errorMessage.value = 'មានបញ្ហាក្នុងការកំណត់លេខសម្ងាត់ថ្មី។ សូមព្យាយាមម្តងទៀត។'
    } finally {
      isLoading.value = false
    }
  }
  
  watch([successMessage, errorMessage], () => {
    if (successMessage.value || errorMessage.value) {
      setTimeout(() => {
        successMessage.value = ''
        errorMessage.value = ''
      }, 5000)
    }
  })
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