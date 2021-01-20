<template>
    <div class="font-sans">
        <div class="flex flex-row w-full mt-4">
          <span class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">
              <svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
          </span>
          <input v-model="name" @input="fieldsUpdated" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="">
        </div>
        <div class="flex flex-row w-full mt-4">
          <span class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">
              <svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
          </span>
          <input v-model="phone" @input="fieldsUpdated" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="">
        </div>
        <div class="flex flex-row w-full mt-4">
          <span class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">
              <svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
          </span>
          <input v-model="email" @input="fieldsUpdated" type="text" class="w-full px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="">
        </div>
        <div class="flex flex-row mt-4"> 
            <div class="flex flex-row w-1/8">  
              <span class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">
                  <svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
                  </svg>
              </span>
              <input v-model="pageSize" @input="fieldsUpdated" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="">
            </div>
            <button class="w-1/5 ml-auto flex bg-blue-600 justify-center items-center text-white px-4 rounded-md focus:outline-none">
                <svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> <label class="md:block hidden">New {{ title }}</label> 
              </button>
        </div>


    </div>
</template>

<script>
export default{
    name: 'SearchField',
    props: {
        title: String
    },
    // Data
    data: function(){
        return {
            name: "",
            email: "",
            phone: "",
            pageSize: 20
        }
    },
    // Methods
    methods: {
        fieldsUpdated: function(){
            this.$emit('fieldsUpdated', {
                name: this.name,
                email: this.email,
                phone: this.phone,
                pageSize: this.pageSize
            })
        }
    }
}
</script>

