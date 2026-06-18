<template>
    <div class="min-h-screen bg-gray-50">
      <section class="bg-green-600 text-white py-16">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">ហាងលក់បន្លែស្រស់</h1>
          <p class="text-lg text-green-100 max-w-2xl mx-auto">
            ស្វែងរកបន្លែស្រស់ៗ សរីរាង្គ 100% ពីចម្ការផ្ទាល់របស់យើង
          </p>
        </div>
      </section>
  
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
      </div>
  
      <div v-else-if="fetchError" class="text-center py-12">
        <svg class="w-24 h-24 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-xl font-bold text-gray-700 mb-2">កំហុសក្នុងការផ្ទុកទិន្នន័យ</h3>
        <p class="text-gray-500">{{ fetchError }}</p>
        <button @click="fetchAllProducts" class="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          ព្យាយាមម្តងទៀត
        </button>
      </div>
  
      <div v-else class="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
        <div class="py-6">
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              @click="filterByCategory('all')"
              :class="[
                'px-5 py-2.5 rounded-full font-medium transition-all duration-200',
                activeCategory === 'all'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              ទាំងអស់ ({{ getCategoryCount('all') }})
            </button>
            <button
              v-for="category in categories"
              :key="category"
              @click="filterByCategory(category)"
              :class="[
                'px-5 py-2.5 rounded-full font-medium transition-all duration-200',
                activeCategory === category
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ category }} ({{ getCategoryCount(category) }})
            </button>
          </div>
        </div>
  
        <div class="flex flex-col lg:flex-row gap-8">
        
          <div class="lg:w-1/4">
            <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-800 mb-4">តម្រង</h3>
              
              <div class="mb-4 p-3 bg-green-50 rounded-lg">
                <p class="text-sm text-gray-600">ប្រភេទដែលកំពុងបង្ហាញ:</p>
                <p class="font-bold text-green-700">{{ activeCategory === 'all' ? 'ទាំងអស់' : activeCategory }}</p>
              </div>
  
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">ស្វែងរក</label>
                <input 
                  type="text" 
                  v-model="searchQuery"
                  placeholder="ស្វែងរកបន្លែ..." 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">តម្លៃ (រៀល)</label>
                <div class="flex gap-4">
                  <input 
                    type="number" 
                    v-model="minPrice"
                    placeholder="អប្បបរមា" 
                    class="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                  <input 
                    type="number" 
                    v-model="maxPrice"
                    placeholder="អតិបរមា" 
                    class="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                </div>
              </div>
              
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">តម្រៀបតាម</label>
                <select v-model="sortBy" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="default">លំនាំដើម</option>
                  <option value="price-asc">តម្លៃទាបបំផុត</option>
                  <option value="price-desc">តម្លៃខ្ពស់បំផុត</option>
                  <option value="name-asc">ឈ្មោះ អក្សរក្រម</option>
                </select>
              </div>
              
              <button 
                @click="clearFilters"
                class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                លុបតម្រងទាំងអស់
              </button>
            </div>
          </div>
          
          <div class="lg:w-3/4">
            <div class="flex justify-between items-center mb-6">
              <p class="text-gray-600">
                បានរកឃើញ <span class="font-bold text-green-600">{{ filteredProducts.length }}</span> 
                ផលិតផល
              </p>
            </div>
            
            <div v-if="filteredProducts.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="product in sortedProducts" 
                :key="product.id" 
                class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div class="relative">
                  <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
                  <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    សរីរាង្គ
                  </span>
                </div>
                
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-800 mb-1">{{ product.name }}</h3>
                  <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
                  <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
                  
                  <div class="flex justify-between items-center mb-3">
                    <div>
                      <span class="text-2xl font-bold text-green-600">{{ formatPrice(product.price) }}៛</span>
                      <span class="text-gray-400 text-sm">/{{ product.unit }}</span>
                    </div>
                  </div>
                  
                  <div class="flex gap-2">
                    <div class="flex items-center border border-gray-300 rounded-lg">
                      <button @click="decrementQuantity(product)" class="px-3 py-1 hover:bg-gray-100">-</button>
                      <span class="px-3 py-1 border-x border-gray-300 min-w-40px text-center">{{ product.quantity }}</span>
                      <button @click="incrementQuantity(product)" class="px-3 py-1 hover:bg-gray-100">+</button>
                    </div>
                    <button @click="addToCart(product)" class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                      <ShoppingCart class="w-5 h-5" size="20" />
                      បន្ថែម
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12">
              <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="text-xl font-bold text-gray-700 mb-2">មិនមានផលិតផល</h3>
              <p class="text-gray-500">សូមសាកល្បងប្តូរតម្រងស្វែងរករបស់អ្នក</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="cartOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity" @click="cartOpen = false"></div>
      <div :class="[
        'fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 transition-transform duration-300',
        cartOpen ? 'translate-x-0' : 'translate-x-full'
      ]">
        <div class="flex flex-col h-full">
          <div class="p-4 border-b flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-800">រទេះទិញទំនិញ</h2>
            <button @click="cartOpen = false" class="text-gray-500 hover:text-gray-700">
              <X class="w-6 h-6" size="24" />
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4">
            <div v-if="cart.length === 0" class="text-center py-12">
              <ShoppingBag class="w-24 h-24 mx-auto text-gray-400 mb-4" size="96" />
              <p class="text-gray-500">រទេះរបស់អ្នកនៅទទេ</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="(item, index) in cart" :key="index" class="flex gap-4 border-b pb-4">
                <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded">
                <div class="flex-1">
                  <h3 class="font-bold text-gray-800">{{ item.name }}</h3>
                  <p class="text-green-600 font-bold">{{ formatPrice(item.price) }}៛</p>
                  <div class="flex items-center gap-2 mt-2">
                    <button @click="updateCartQuantity(item, -1)" class="px-2 py-1 border rounded">-</button>
                    <span class="px-3">{{ item.cartQuantity }}</span>
                    <button @click="updateCartQuantity(item, 1)" class="px-2 py-1 border rounded">+</button>
                    <button @click="removeFromCart(index)" class="ml-auto text-red-500 hover:text-red-700">
                      <Trash2 class="w-5 h-5" size="20" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="cart.length > 0" class="border-t p-4">
            <div class="flex justify-between mb-2">
              <span class="font-bold">សរុប:</span>
              <span class="font-bold text-green-600">{{ formatPrice(totalPrice) }}៛</span>
            </div>
            <div class="flex justify-between mb-4 text-sm text-gray-500">
              <span>ការដឹកជញ្ជូន:</span>
              <span>ឥតគិតថ្លៃ</span>
            </div>
            <button class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              បញ្ជាទិញឥឡូវនេះ
            </button>
          </div>
        </div>
      </div>
  
      <footer class="bg-gray-500 text-white py-8">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-2xl font-bold mb-3 flex items-center gap-2">
                <Sprout class="text-green-400" size="28" /> DASTORE
              </h3>
              <p class="text-black text-sm hover:text-white">
                លក់បន្លែស្រស់ៗ សរីរាង្គ 100% ពីចម្ការផ្ទាល់
              </p>
            </div>
            
            <!-- Quick Links -->
            <div>
              <h4 class="font-bold mb-3 text-white">តំណភ្ជាប់</h4>
              <ul class="space-y-2 text-sm text-black">
                <li><a href="#" class=" hover:text-white transition">ទំព័រដើម</a></li>
                <li><a href="#" class=" hover:text-white transition">ផលិតផល</a></li>
                <li><a href="#" class=" hover:text-white transition">អំពីយើង</a></li>
                <li><a href="#" class=" hover:text-white transition">ទំនាក់ទំនង</a></li>
              </ul>
            </div>
            
            <!-- Contact -->
            <div>
              <h4 class="font-bold mb-3 text-white">ទំនាក់ទំនង</h4>
              <ul class="space-y-2 text-sm text-black">
                <li class="flex items-center gap-2 hover:text-white">
                  <MapPin size="16" /> ភ្នំពេញ, កម្ពុជា
                </li>
                <li class="flex items-center gap-2 hover:text-white">
                  <Phone size="16" /> 089 78 43 18
                </li>
                <li class="flex items-center gap-2 hover:text-white">
                  <Mail size="16" /> dastore@gmail.com
                </li>
                <li class="flex items-center gap-2 hover:text-white">
                  <Clock size="16" /> ច័ន្ទ-សុក្រ: 7ព្រឹក-8ល្ងាច
                </li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-black">
            <p>&copy; 2024 DASTORE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { 
    Clock, 
    Mail, 
    MapPin, 
    Phone,
    ShoppingCart,
    ShoppingBag,
    X,
    Trash2,
    Sprout
  } from 'lucide-vue-next'
  import { ref, computed, onMounted } from 'vue'
  
  
  const allProducts = ref([])
  const products = ref([])
  const loading = ref(false)
  const fetchError = ref(null)
  const activeCategory = ref('all')
  const searchQuery = ref('')
  const minPrice = ref('')
  const maxPrice = ref('')
  const sortBy = ref('default')
  const cartOpen = ref(false)
  const cart = ref([])
  
  const categories = computed(() => {
    const unique = [...new Set(allProducts.value.map(p => p.category))]
    return unique.sort()
  })
  
  const filteredByCategory = computed(() => {
    if (activeCategory.value === 'all') {
      return allProducts.value
    }
    return allProducts.value.filter(p => p.category === activeCategory.value)
  })
  
  const filteredProducts = computed(() => {
    let filtered = filteredByCategory.value
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query)
      )
    }
    if (minPrice.value) {
      filtered = filtered.filter(p => p.price >= Number(minPrice.value))
    }
    if (maxPrice.value) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice.value))
    }
    
    return filtered
  })
  
  const sortedProducts = computed(() => {
    const sorted = [...filteredProducts.value]
    
    switch (sortBy.value) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return sorted
    }
  })
  
  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.cartQuantity), 0)
  })
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  const fetchAllProducts = async () => {
    loading.value = true
    fetchError.value = null
    
    try {
      const response = await fetch('/Vegetables.json')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      allProducts.value = data.products.map(product => ({
        ...product,
        quantity: 1,
        cartQuantity: 0,
        isOrganic: false,
        discount: null,
        description: `ស្រស់ៗ ${product.name} ពីចម្ការផ្ទាល់`,
        unit: 'គីឡូក្រាម'
      }))
      
      products.value = allProducts.value
      
    } catch (err) {
      fetchError.value = err.message
      console.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }
  
  const filterByCategory = (category) => {
    if (category === 'all') {
      products.value = allProducts.value
    } else {
      products.value = allProducts.value.filter(p => p.category === category)
    }
    activeCategory.value = category
  }
  
  const getCategoryCount = (category) => {
    if (category === 'all') {
      return allProducts.value.length
    }
    return allProducts.value.filter(p => p.category === category).length
  }
  
  const incrementQuantity = (product) => {
    product.quantity++
  }
  
  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      product.quantity--
    }
  }
  
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.cartQuantity += product.quantity
    } else {
      cart.value.push({
        ...product,
        cartQuantity: product.quantity
      })
    }
    
    product.quantity = 1
    cartOpen.value = true
  }
  
  const updateCartQuantity = (item, change) => {
    const newQuantity = item.cartQuantity + change
    if (newQuantity > 0) {
      item.cartQuantity = newQuantity
    } else {
      const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
      if (index !== -1) {
        cart.value.splice(index, 1)
      }
    }
  }
  
  const removeFromCart = (index) => {
    cart.value.splice(index, 1)
  }
  
  const clearFilters = () => {
    searchQuery.value = ''
    minPrice.value = ''
    maxPrice.value = ''
    sortBy.value = 'default'
    activeCategory.value = 'all'
    products.value = allProducts.value
  }
  
  onMounted(() => {
    fetchAllProducts()
  })
  </script>