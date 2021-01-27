<template>
  <div v-if="showModal" class="z-10 modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
    <div class="py-3 sm:max-w-xl sm:mx-auto w-11/12 md:w-1/4">
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
                <div class="ml-auto w-full flex flex-col">
                 <label class="leading-loose">Name:</label>
                 <input v-model="patient.name" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col">
                  <label class="leading-loose">Phone:</label>
                  <input v-model="patient.phone" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col">
                  <label class="leading-loose">E-Mail:</label>
                  <input v-model="patient.email" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col">
                  <label class="leading-loose">TC No:</label>
                  <input v-model="patient.tcno" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Patient Name">
                </div>
                <div class="w-full flex flex-col">
                  <label class="leading-loose">Hes Code:</label>
                  <input v-model="patient.hescode" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Patient Name">
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
// TODO protocol number input
export default {
  name: "PatientModal",
  data: function(){
    return {
      showModal: false,
      patient: {},
      button: "Create"
    }
  },
  methods: {
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
    }
  }
}
</script>