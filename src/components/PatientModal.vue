<template>
  <div v-if="showModal" class="z-10 modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
    <div class="py-3 sm:max-w-xl sm:mx-auto w-11/12 xl:w-2/4">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">{{ patient.name.charAt(0) }}</div>
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">{{ title }}</h2>
              <p class="text-sm text-gray-500 font-normal leading-relaxed">Edit patient</p>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div class="flex flex-col items-center space-x-4">
                <div class="ml-4 w-full flex flex-col md:flex-row md:mb-3">
                 <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Name:</label>
                 <input v-model="patient.name" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col md:flex-row md:mb-3">
                  <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Phone:</label>
                  <input v-model="patient.phone" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col md:flex-row md:mb-3">
                  <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">E-Mail:</label>
                  <input v-model="patient.email" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col md:flex-row md:mb-3">
                  <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">TC:</label>
                  <input v-model="patient.tcno" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col md:flex-row md:mb-3">
                  <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Hes:</label>
                  <input v-model="patient.hescode" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col md:flex-row md:mb-3">
                  <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Protocol:</label>
                  <vue-tags-input
                      class="focus:ring-gray-500 h-full focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600"
                      v-model="tag"
                      :tags="tags"
                      @tags-changed="newTags => patient.protocolNumbers = convertTags(newTags)"
                  />
                </div>
            </div>
            <div class="pt-4 flex items-center space-x-4">
              <button @click="showModal = false" class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
              </button>
              <button @click="saveClicked" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">{{ button }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import dayjs from "dayjs";

export default {
  components: {
    VueTagsInput
  },
  name: "PatientModal",
  data: function(){
    return {
      showModal: false,
      patient: {},
      button: "Create",
      tag: ''
    }
  },
  methods: {
    convertTags: function(tags){
      console.log(tags)
      let newTags = {}
      tags.forEach((x) => {
        newTags[parseInt(x.text)] = new dayjs().format('YYYY-MM-DDTHH:mm:ssZ')
      })
      return newTags
    },
    showPatient: function(patient){
      this.patient = patient;
      this.showModal = true;
      this.button = "Save"
    },
    emptyModal: function() {
      this.patient = {
        name: "",
        phone: "",
      }
      this.showModal = true
      this.button = "Create"
    },
    saveClicked: function(){
      this.showModal = false
      this.$emit("savePatient", this.patient);
    },
  },
  computed: {
    title: function(){
      if(this.patient.name === "")
        return "New Patient"
      return this.patient.name
    },
    tags: function(){
      console.log(this.patient.protocolNumbers)
      let tags = []
      for(const num in this.patient.protocolNumbers){
        tags.push({
          text: num.toString() + " (" + dayjs(this.patient.protocolNumbers[num]).format('DD/MM/YYYY') + ")",
          style: "background-color: rgba(29, 78, 216, var(--tw-bg-opacity))"
        })
      }
      return tags
    }
  }
}
</script>
