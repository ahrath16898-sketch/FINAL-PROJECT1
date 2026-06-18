<template>
    <div>
    
      <section class="h-min bg-gray-400 from-green-50 to-amber-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
           
            <div class="space-y-6">
              <div class="inline-block">
                <p class="uppercase tracking-[6px] text-sm text-green-600 font-semibold mb-4">
                   បន្លែសរីរាង្គ 100%
                </p>
              </div>
  
              <h1 class="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-800">
                បន្លែស្រស់ៗ
                <span class="text-green-600 block mt-2">ពីចម្ការមកតុបាយអ្នក</span>
              </h1>
  
              <div class="space-y-4 text-gray-600">
                <p class="text-lg leading-relaxed">
                  សូមស្វាគមន៍មកកាន់ហាងលក់បន្លែស្រស់របស់យើងខ្ញុំ!
                  យើងមានបន្លែស្រស់ៗជាច្រើនប្រភេទ ដាំដោយគ្មានជាតិគីមី
                  និងប្រើប្រាស់ជីធម្មជាតិ 100%។
                </p>
              </div>
  
              <div class="flex flex-wrap gap-4 mt-8">
                <button class="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg 
                               hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl">
                  <Inbox class="inline mr-2" size="20" /> ទិញឥឡូវនេះ
                </button>
                <button class="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg 
                               hover:bg-green-50 transition duration-300">
                  <Phone class="inline mr-2" size="20" /> ទំនាក់ទំនងមកយើង
                </button>
              </div>
  
              <div class="flex gap-8 pt-8">
                <div>
                  <p class="text-2xl font-bold text-green-600">100+</p>
                  <p class="text-sm text-gray-500">ប្រភេទបន្លែ</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-green-600">100+</p>
                  <p class="text-sm text-gray-500">អតិថិជនពេញចិត្ត</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-green-600">10ឆ្នាំ</p>
                  <p class="text-sm text-gray-500">បទពិសោធន៍</p>
                </div>
              </div>
            </div>
  
            <div class="relative">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://i.pinimg.com/736x/bb/5c/22/bb5c2235a0c39d0bb19a0a43f41a3a56.jpg" alt="បន្លែស្រស់ៗ"
                  class="w-full h-96 object-cover hover:scale-105 transition duration-500" />
              </div>
              <div class="absolute -bottom-6 -left-6 bg-white p-5 shadow-xl rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf class="text-2xl text-green-600" size="28" />
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-green-700">ស្រស់ៗ</p>
                    <p class="text-gray-500 text-sm">រើសពីចម្ការ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">ហេតុអ្វីជ្រើសរើសយើង?</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">យើងផ្តល់ជូននូវបន្លែដែលមានគុណភាពខ្ពស់
              និងសុវត្ថិភាពសម្រាប់គ្រួសារអ្នក</p>
          </div>
  
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-6 hover:shadow-lg transition-shadow rounded-xl">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout class="text-3xl text-green-600" size="32" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">សរីរាង្គ 100%</h3>
              <p class="text-gray-600">គ្មានជាតិគីមី និងថ្នាំសម្លាប់សត្វល្អិត</p>
            </div>
  
            <div class="text-center p-6 hover:shadow-lg transition-shadow rounded-xl">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck class="text-3xl text-green-600" size="32" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">ដឹកជញ្ជូនឥតគិតថ្លៃ</h3>
              <p class="text-gray-600">ដឹកដល់ផ្ទះសម្រាប់ការបញ្ជាទិញលើស 50000រៀល</p>
            </div>
  
            <div class="text-center p-6 hover:shadow-lg transition-shadow rounded-xl">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck class="text-3xl text-green-600" size="32" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">ធានាគុណភាព</h3>
              <p class="text-gray-600">ប្រសិនបើមិនពេញចិត្ត យើងសងប្រាក់វិញ</p>
            </div>
  
            <div class="text-center p-6 hover:shadow-lg transition-shadow rounded-xl">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock class="text-3xl text-green-600" size="32" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">បើករាល់ថ្ងៃ</h3>
              <p class="text-gray-600">បម្រើការពីម៉ោង 7ព្រឹក ដល់ 8ល្ងាច</p>
            </div>
          </div>
        </div>
      </section>
  
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">បន្លែលក់ដាច់បំផុត</h2>
            <p class="text-gray-600">ជ្រើសរើសបន្លែស្រស់ៗពីចម្ការរបស់យើង</p>
          </div>
  
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="product in FecthApiHomeView" :key="product.id"
              class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800">{{ product.name }}</h3>
                <p class="text-green-600 font-bold text-xl mt-2">{{ product.price }}រៀល/គីឡូ</p>
                <button class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <ShoppingCart size="18" /> បន្ថែមក្នុងរទេះ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">អតិថិជនរបស់យើងនិយាយអ្វីខ្លះ?</h2>
            <p class="text-gray-600">ស្តាប់បទពិសោធន៍ពីអតិថិជនដែលបានប្រើប្រាស់សេវាកម្មរបស់យើង</p>
          </div>
  
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center gap-1 text-yellow-400 mb-4">
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
              </div>
              <p class="text-gray-600 mb-4">"បន្លែស្រស់ណាស់ តម្លៃសមរម្យ សូមណែនាំអោយទិញនៅហាងនេះ!"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <User class="text-green-600" size="20" />
                </div>
                <div>
                  <p class="font-bold text-gray-800">រឹក ធីតា</p>
                  <p class="text-sm text-gray-500">កណ្តាល</p>
                </div>
              </div>
            </div>
  
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center gap-1 text-yellow-400 mb-4">
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
              </div>
              <p class="text-gray-600 mb-4">"ការដឹកជញ្ជូនលឿន បន្លែស្រស់ៗ សុវត្ថិភាព នឹងបន្តទិញទៀត"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <User class="text-green-600" size="20" />
                </div>
                <div>
                  <p class="font-bold text-gray-800">តុក ​ស្រីណេត</p>
                  <p class="text-sm text-gray-500">ព្រៃវែង</p>
                </div>
              </div>
            </div>
  
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center gap-1 text-yellow-400 mb-4">
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
                <Star class="fill-yellow-400" size="20" />
              </div>
              <p class="text-gray-600 mb-4">"បន្លែសរីរាង្គល្អ តម្លៃសមរម្យ សេវាកម្មល្អ សូមអរគុណ!"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <User class="text-green-600" size="20" />
                </div>
                <div>
                  <p class="font-bold text-gray-800">ម៉ែន​ និស្ស័យ</p>
                  <p class="text-sm text-gray-500">បាត់ដំបង</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="py-20 bg-green-400">
        <div class="max-w-4xl mx-auto text-center px-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">ត្រៀមខ្លួនទិញបន្លែស្រស់ៗហើយឬនៅ?</h2>
          <p class="text-green-100 mb-8">ទទួលបានការបញ្ចុះតម្លៃ 10% សម្រាប់ការបញ្ជាទិញលើកដំបូងរបស់អ្នក</p>
          <div class="flex flex-wrap justify-center gap-4">
            <button class="px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
              <ShoppingBag size="20" /> ចាប់ផ្តើមទិញឥឡូវ
            </button>
            <button class="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition flex items-center gap-2">
              <Phone size="20" /> ទំនាក់ទំនងមកយើង
            </button>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-gray-500 text-white py-12">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="grid md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-2xl font-bold mb-4"> DASTORE</h3>
              <p class="text-black hover:text-white">លក់បន្លែស្រស់ៗ ពីចម្ការផ្ទាល់ គ្មានជាតិគីមី</p>
            </div>
  
            <div>
              <h4 class="font-bold mb-4">តំណភ្ជាប់រហ័ស</h4>
              <ul class="space-y-2 text-black">
                <li><router-link to="/home" class="hover:text-white flex items-center gap-2"><Home size="16" /> ផ្ទះ</router-link></li>
                <li><router-link to="/shop" class="hover:text-white flex items-center gap-2"><ShoppingBag size="16" /> ទិញទំនិញ</router-link></li>
                <li><router-link to="/about" class="hover:text-white flex items-center gap-2"><Info size="16" /> អំពីយើង</router-link></li>
                <li><router-link to="/contact" class="hover:text-white flex items-center gap-2"><Mail size="16" /> ទំនាក់ទំនង</router-link></li>
              </ul>
            </div>
  
            <div>
              <h4 class="font-bold mb-4">ទំនាក់ទំនង</h4>
              <ul class="space-y-2 text-black">
                <li class="flex items-center gap-2 hover:text-white"><MapPin size="16" /> ភ្នំពេញ, កម្ពុជា</li>
                <li class="flex items-center gap-2 hover:text-white"><Phone size="16" /> 089 78 43 18</li>
                <li class="flex items-center gap-2 hover:text-white"><Mail size="16" /> dastore@gmail.com</li>
              </ul>
            </div>
  
            <div>
              <h4 class="font-bold mb-4">ម៉ោងបើក</h4>
              <ul class="space-y-2 text-black">
                <li class="flex items-center gap-2 hover:text-white"><Clock size="16" /> ច័ន្ទ - សុក្រ: 7:00ព្រឹក - 20:00យប់</li>
                <li class="flex items-center gap-2 hover:text-white"><Clock size="16" /> សៅរ៍ - អាទិត្យ: 8:00ព្រឹក - 18:00យប់</li>
              </ul>
            </div>
          </div>
  
          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-black">
            <p>&copy; 2024 DASTORE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { 
    Inbox, 
    Phone, 
    Leaf, 
    Sprout, 
    Truck,
    ShieldCheck,
    Clock, 
    Star, 
    User,
    ShoppingCart,
    Eye,
    ShoppingBag,
    Home,
    Info,
    Mail,
    MapPin
  } from 'lucide-vue-next'
  
  const FecthApiHomeView = ref([])
  const Loading = ref(false)
  const Error = ref(null)
  
  const FetchApi = async () => {
    Loading.value = true
    Error.value = null
  
    try {
      const response = await fetch('/Vegetables.json') 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      FecthApiHomeView.value = data.products 
      
      console.log('Products loaded:', FecthApiHomeView.value)
      console.log('Number of products:', FecthApiHomeView.value.length)
  
    } catch (error) {
      Error.value = error.message
      console.error('Fetch error:', error)
    } finally {
      Loading.value = false
    }
  }
  
  onMounted(() => {
    FetchApi()
  })
  </script>