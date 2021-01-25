<template>
  <div v-if="showModal" class="z-10 modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
    <div class="py-3 sm:max-w-xl sm:mx-auto">
        <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div class="max-w-md mx-auto">
            <div class="flex items-center space-x-5">
              <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">A</div>
              <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 class="leading-relaxed">Create an Appointment</h2>
                <p class="text-sm text-gray-500 font-normal leading-relaxed">Create an appointment</p>
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="flex items-center space-x-4">
                  <div class="flex flex-col">
                    <label class="leading-loose">Start</label>
                    <DatetimePicker @change="(v) => start = v" class="focus-within:text-gray-600 text-gray-400" :init="false" :startFromMonday="false" :autoClose="false" :startDate="start">
                      <input v-model="start" type="text" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
                      <div class="absolute left-3 top-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                    </DatetimePicker>
                  </div>
                  <div class="flex flex-col">
                    <label class="leading-loose">End</label>
                    <DatetimePicker @change="(v) => end = v" class="relative focus-within:text-gray-600 text-gray-400" :init="false" :startFromMonday="false" :autoClose="false" :startDate="end">
                      <input v-model="end" type="text" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
                      <div class="absolute left-3 top-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                    </DatetimePicker>
                  </div>
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose">Patient</label>
                    <Typeahead
                      @selected="selectedPatient"
                      @searchFieldUpdated="updatePatientSuggestions"
                      :lists="patientSuggestions"
                      :clearInputWhenClicked="false"
                      :inputClass="['px-4', 'py-2', 'border', 'focus:ring-gray-500', 'focus:border-gray-900', 'w-full', 'sm:text-sm', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'text-gray-600']"
                      placeholder="Patient Name">
                      </Typeahead>
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose">Event Description</label>
                  <input type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Optional">
                </div>
                <div class="flex flex-col">
                    <label class="inline-flex items-center mt-3">
                        <input v-model="online" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" checked><span class="ml-2 text-gray-700">This appointment will be held online.</span>
                    </label>
                </div>
              </div>
              <div class="pt-4 flex items-center space-x-4">
                  <button @click="showModal = false" class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                  </button>
                  <button @click="saveClicked" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import DatetimePicker from '@/components/DatetimePicker'
import Typeahead from '@/components/Typeahead';
import dayjs from 'dayjs'

export default{
    components: {
        DatetimePicker,
        Typeahead
    },
    // Data
    data: function(){
        return {
            user: "",
            start: "",
            end: "",
            online: false,
            showModal: false,
            patient: null,
            patientSuggestions: []
        }
    },
    // Methods
    methods: {
        displayModal: function(start, end){
            this.start = dayjs(start).format('YYYY-MM-DDTHH:mm');
            this.end = dayjs(end).format('YYYY-MM-DDTHH:mm');
            this.online = false;
            this.user = "";
            this.showModal = true;
        },
        saveClicked:  function(){
            this.$axios.post('/appointments', {
                start: dayjs(this.start, 'YYYY-MM-DDTHH:mm').toISOString(), 
                end: dayjs(this.end, 'YYYY-MM-DDTHH:mm').toISOString(), 
                online: this.online,
                patient: this.patient
            }, {
                headers: {
                 'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
                }
            }).then((result) =>{
                console.log(result);
                this.$emit('createdEvent', {
                    title: result.data.appointment.patient.name,
                    start: result.data.appointment.start,  
                    end: result.data.appointment.end,
                    backgroundColor: result.data.appointment.patient.safe ? "#1266F1" : "#FF9100",
                    extendedProps: {
                        id: result.data.appointment.id,
                        phone: result.data.appointment.patient.phone,
                        safe: result.data.appointment.patient.safe,
                        online: result.data.appointment.online,
                        patient: result.data.appointment.patient,
                        appObj: result.data.appointment
                    }
                });
            }).catch((err) => {
                console.log(err);
            })
            this.showModal = false;
        },        
        selectedPatient: function(entry){
            this.patient = entry.patient;
        },
        updatePatientSuggestions: function(searchTerm){
            this.$axios.get('/patients', {
            params: {
                name: searchTerm
            },
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
            }
            }).then((searchResults) => {
                console.log(searchResults);
                this.patientSuggestions = searchResults.data.patients.map(function(x){
                    return {
                        name: x.name,
                        id: x.id,
                        patient: x
                    }        
                })
            })
            .catch((err) => {
                console.log(err);
                console.log("PLACEHOLDER")
            });         
        }
    }
}
</script>

