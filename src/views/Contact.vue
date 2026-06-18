<template>
    <div class="min-h-screen bg-gray-50">
  
      <section class="bg-green-500 text-white py-16">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">ទំនាក់ទំនងមកយើង</h1>
          <p class="text-lg text-green-100 max-w-2xl mx-auto">
            យើងខ្ញុំសូមស្វាគមន៍រាល់សំណួរ មតិយោបល់ និងការផ្តល់យោបល់របស់អ្នក
          </p>
        </div>
      </section>
  
      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div class="grid lg:grid-cols-3 gap-8">
          
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MapPin class="text-green-600" size="28" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">អាសយដ្ឋាន</h3>
              <p class="text-gray-600">
                ផ្ទះលេខ 15(គ) ផ្លូវ បេតុង​​ <br>
                សង្កាត់ចោមចៅទី3<br>
                ខណ្ឌពោធិ៍សែនជ័យ ភ្នំពេញ
              </p>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Phone class="text-green-600" size="28" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">ទូរស័ព្ទ</h3>
              <p class="text-gray-600">
                ហាង: 088 90 33 512<br>
                ការដឹកជញ្ជូន: 092 93 25 34<br>
                សេវាកម្មអតិថិជន: 088 40 10 115
              </p>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail class="text-green-600" size="28" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">អ៊ីមែល</h3>
              <p class="text-gray-600">
                dastore@gmail.com<br>
                support.dastore@gmail.com<br>
                sales.dastore@gmail.com
              </p>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Clock class="text-green-600" size="28" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">ម៉ោងបើក</h3>
              <p class="text-gray-600">
                ច័ន្ទ - សុក្រ: 7:00 - 20:00 <br>
                សៅរ៍ - អាទិត្យ: 8:00 - 18:00<br>
                បុណ្យជាតិ: បិទ
              </p>
            </div>
          </div>
          
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">ផ្ញើសារមកកាន់យើង</h2>
              <p class="text-gray-600 mb-6">សូមបំពេញព័ត៌មានខាងក្រោម យើងខ្ញុំនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗ</p>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-gray-700 font-semibold mb-2">នាមត្រកូល និងនាមខ្លួន *</label>
                    <input 
                      type="text" 
                      v-model="form.name"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-gray-700 font-semibold mb-2">លេខទូរស័ព្ទ *</label>
                    <input 
                      type="tel" 
                      v-model="form.phone"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="សូមបញ្ចូលលេខទូរស័ព្ទ"
                    >
                  </div>
                </div>
                
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">អ៊ីមែល *</label>
                  <input 
                    type="email" 
                    v-model="form.email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="សូមបញ្ចូលអ៊ីមែល"
                  >
                </div>
                
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">ប្រធានបទ *</label>
                  <select 
                    v-model="form.subject"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">ជ្រើសរើសប្រធានបទ</option>
                    <option value="បញ្ជាទិញ">បញ្ជាទិញ</option>
                    <option value="សំណួរអំពីផលិតផល">សំណួរអំពីផលិតផល</option>
                    <option value="ការដឹកជញ្ជូន">ការដឹកជញ្ជូន</option>
                    <option value="ការត្អូញត្អែរ">ការត្អូញត្អែរ</option>
                    <option value="សហការការងារ">សហការការងារ</option>
                    <option value="ផ្សេងៗ">ផ្សេងៗ</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">សារ *</label>
                  <textarea 
                    v-model="form.message"
                    required
                    rows="6"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="សូមបញ្ចូលសាររបស់អ្នក..."
                  ></textarea>
                </div>
                
                <div class="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    v-model="form.agree"
                    required
                    class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  >
                  <label class="text-gray-600 text-sm">
                    ខ្ញុំយល់ព្រមទទួលព័ត៌មាន និងការផ្តល់ជូនពិសេសពី DASTORE
                  </label>
                </div>
                
                <button 
                  type="submit"
                  class="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-[1.02]"
                >
                  ផ្ញើសារ
                </button>
              </form>
              
              <div v-if="showSuccess" class="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! យើងនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗ។</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-8">ទីតាំងហាងរបស់យើង</h2>
          <div class="rounded-2xl overflow-hidden shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.014719990236!2d104.917107!3d11.550123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513b2b8f3d0b%3A0x8b8b8b8b8b8b8b8b!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1234567890123!5m2!1sen!2skh" 
              width="100%" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy"
              class="w-full"
            ></iframe>
          </div>
        </div>
      </section>
      
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-6 lg:px-12">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">សំណួរដែលគេសួរញឹកញាប់</h2>
            <p class="text-gray-600">ចម្លើយចំពោះសំណួរដែលអតិថិជនរបស់យើងតែងតែសួរ</p>
          </div>
          
          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-xl shadow-md overflow-hidden">
              <button 
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span class="font-semibold text-gray-800">{{ faq.question }}</span>
                <ChevronDown 
                  :class="{'rotate-180': openFaq === index}"
                  class="w-5 h-5 text-green-600 transition-transform duration-300"
                  size="20"
                />
              </button>
              <div 
                v-show="openFaq === index"
                class="px-6 pb-4 text-gray-600 border-t border-gray-100"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer class="bg-gray-500 text-white py-12">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div>
              <h3 class="text-2xl font-bold mb-3 flex items-center gap-2">
                <Sprout class="text-green-400" size="28" /> DASTORE
              </h3>
              <p class="text-black text-sm">
                លក់បន្លែស្រស់ៗ សរីរាង្គ 100% ពីចម្ការផ្ទាល់
              </p>
              <div class="flex gap-4 mt-4">
                <a href="#" class="text-black hover:text-white transition">
                  <Facebook class="w-6 h-6" size="24" />
                </a>
                <a href="#" class="text-black hover:text-white transition">
                  <Twitter class="w-6 h-6" size="24" />
                </a>
                <a href="#" class="text-black hover:text-white transition">
                  <Instagram class="w-6 h-6" size="24" />
                </a>
                <a href="#" class="text-black hover:text-white transition">
                  <Youtube class="w-6 h-6" size="24" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 class="font-bold mb-3 text-white">តំណភ្ជាប់</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="#" class="text-black hover:text-white transition flex items-center gap-2"><ChevronRight class="text-black" size="16" /> ទំព័រដើម</a></li>
                <li><a href="#" class="text-black hover:text-white transition flex items-center gap-2"><ChevronRight class="text-black" size="16" /> ផលិតផល</a></li>
                <li><a href="#" class="text-black hover:text-white transition flex items-center gap-2"><ChevronRight class="text-black" size="16" /> អំពីយើង</a></li>
                <li><a href="#" class="text-black hover:text-white transition flex items-center gap-2"><ChevronRight class="text-black" size="16" /> ទំនាក់ទំនង</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-bold mb-3 text-white">ទំនាក់ទំនង</h4>
              <ul class="space-y-2 text-sm text-black">
                <li class="flex items-center gap-2 hover:text-white">
                  <MapPin class="text-black hover:text-inherit flex" size="16" /> ភ្នំពេញ, កម្ពុជា
                </li>
                <li class="flex items-center gap-2 hover:text-white">
                  <Phone class="text-black hover:text-white flex" size="16" /> 089 78 43 18
                </li>
                <li class="flex items-center gap-2 hover:text-white">
                  <Mail class="text-black hover:text-white flex" size="16" /> dastore@gmail.com
                </li>
                <li class="flex items-center gap-2 hover:text-white">
                  <Clock class="text-black hover:text-white flex" size="16" /> 7:00 - 20:00
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-bold mb-3 text-white">ជាវព្រឹត្តិបត្រ</h4>
              <p class="text-black text-sm mb-3">
                ទទួលបានព័ត៌មានថ្មីៗ និងការបញ្ចុះតម្លៃពិសេស
              </p>
              <div class="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="អ៊ីមែលរបស់អ្នក..." 
                  class="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                >
                <button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
                  <Send size="16" /> ជាវ
                </button>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-black">
            <p>&copy; 2024 DASTORE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Sprout,
    ChevronDown,
    ChevronRight,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Send
  } from 'lucide-vue-next'
  import { ref } from 'vue'
  
  const form = ref({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    agree: false
  })
  
  const showSuccess = ref(false)
  const openFaq = ref(null)
  
  const faqs = ref([
    {
      question: 'តើខ្ញុំអាចបញ្ជាទិញបន្លែតាមអនឡាញដោយរបៀបណា?',
      answer: 'អ្នកអាចបញ្ជាទិញបានតាមរយៈគេហទំព័ររបស់យើងដោយចូលទៅកាន់ទំព័រ Shop ជ្រើសរើសបន្លែដែលអ្នកចង់ទិញ បញ្ចូលចំនួន រួចចុចបន្ថែមក្នុងរទេះ។ បន្ទាប់មកអ្នកអាចធ្វើការបញ្ជាទិញ និងបំពេញព័ត៌មានសម្រាប់ការដឹកជញ្ជូន។'
    },
    {
      question: 'តើថ្លៃដឹកជញ្ជូនប៉ុន្មាន?',
      answer: 'យើងផ្តល់ជូនការដឹកជញ្ជូនឥតគិតថ្លៃសម្រាប់ការបញ្ជាទិញចាប់ពី ៥០,០០០៛ ឡើងទៅក្នុងបរិវេណរាជធានីភ្នំពេញ។ សម្រាប់ការបញ្ជាទិញក្រោម ៥០,០០០៛ ថ្លៃដឹកជញ្ជូនគឺ ៥,០០០៛។'
    },
    {
      question: 'តើបន្លែរបស់យើងស្រស់ប៉ុណ្ណា?',
      answer: 'បន្លែរបស់យើងត្រូវបានប្រមូលផលនៅពេលព្រឹកព្រលឹម ហើយដឹកជញ្ជូនដល់អតិថិជនក្នុងថ្ងៃតែមួយ។ យើងធានាថាបន្លែរបស់យើងស្រស់ និងមានគុណភាពខ្ពស់។'
    },
    {
      question: 'តើខ្ញុំអាចត្រឡប់បន្លែវិញបានទេប្រសិនបើមិនពេញចិត្ត?',
      answer: 'បាទ/ចាស៎! យើងមានគោលការណ៍ធានាគុណភាព ១០០%។ ប្រសិនបើអ្នកមិនពេញចិត្តនឹងផលិតផលរបស់យើងទេ អ្នកអាចត្រឡប់បន្លែវិញក្នុងរយៈពេល ២៤ ម៉ោង ហើយយើងនឹងសងប្រាក់វិញជូនអ្នក។'
    },
    {
      question: 'តើយើងមានសេវាកម្មដឹកជញ្ជូនក្រៅភ្នំពេញដែរឬទេ?',
      answer: 'បច្ចុប្បន្ននេះ យើងផ្តល់សេវាកម្មដឹកជញ្ជូនតែក្នុងបរិវេណរាជធានីភ្នំពេញប៉ុណ្ណោះ។ យើងកំពុងរៀបចំផែនការពង្រីកសេវាកម្មទៅកាន់ខេត្តនានានាពេលអនាគត។'
    }
  ])
  
  const toggleFaq = (index) => {
    openFaq.value = openFaq.value === index ? null : index
  }
  
  const submitForm = () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', form.value)
    
    // Show success message
    showSuccess.value = true
    
    // Reset form
    form.value = {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      agree: false
    }
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  }
  </script>