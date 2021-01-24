<template>
    <div @click="$emit('showModal', patient)" class="font-sans items-center flex flex-col md:flex-row hover:bg-gray-100">
        <div class="">
            <h5>{{ patient.name }}</h5>
            <p> {{ patient.phone }}</p>
            <small class="text-gray-600">{{ patient.email }}</small>
        </div> 
        <div class="h-1/4 w-full md:w-5/12 flex flex-row ml-auto content-end">
            <button @click.stop="covidCheck" :class="{'text-white bg-green-500' : patient.safe, 'text-black bg-yellow-500' : !patient.safe}" class="ml-full fill-current mt-2 md:mt-0 p-1 w-1/3 md:w-1/12 ml-auto flex justify-center items-center rounded-md focus:outline-none"><svg class="h-6" id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m480 224c-11.82 0-22.16 6.44-27.7 16h-29.06c-3.26-34.338-16.889-65.697-37.727-90.886l20.612-20.612c10.603 2.854 22.516.104 30.894-8.261 12.48-12.48 12.48-32.78 0-45.26s-32.78-12.48-45.26 0c-8.349 8.359-11.109 20.226-8.261 30.894l-20.612 20.612c-25.189-20.838-56.548-34.467-90.886-37.727v-29.06c9.56-5.54 16-15.88 16-27.7 0-17.65-14.35-32-32-32s-32 14.35-32 32c0 11.82 6.44 22.16 16 27.7v29.06c-34.338 3.26-65.697 16.889-90.886 37.727l-20.612-20.612c2.848-10.669.087-22.536-8.261-30.894-12.48-12.48-32.78-12.48-45.26 0s-12.48 32.78 0 45.26c8.374 8.36 20.286 11.117 30.894 8.261l20.612 20.612c-20.838 25.189-34.467 56.548-37.727 90.886h-29.06c-5.54-9.56-15.88-16-27.7-16-17.65 0-32 14.35-32 32s14.35 32 32 32c11.82 0 22.16-6.44 27.7-16h29.06c3.26 34.338 16.889 65.697 37.727 90.886l-20.612 20.612c-10.668-2.848-22.536-.087-30.894 8.261-12.48 12.48-12.48 32.78 0 45.26 12.503 12.503 32.803 12.457 45.26 0 8.349-8.359 11.109-20.226 8.261-30.894l20.612-20.612c25.189 20.838 56.548 34.467 90.886 37.727v29.06c-9.56 5.54-16 15.88-16 27.7 0 17.65 14.35 32 32 32s32-14.35 32-32c0-11.82-6.44-22.16-16-27.7v-29.06c34.338-3.26 65.697-16.889 90.886-37.727l20.612 20.612c-2.848 10.668-.087 22.536 8.261 30.894 12.457 12.457 32.757 12.503 45.26 0 12.48-12.48 12.48-32.78 0-45.26-8.359-8.349-20.226-11.109-30.894-8.261l-20.612-20.612c20.838-25.189 34.467-56.548 37.727-90.886h29.06c5.54 9.56 15.88 16 27.7 16 17.65 0 32-14.35 32-32s-14.35-32-32-32zm-277 24c-15.44 0-28-12.56-28-28s12.56-28 28-28 28 12.56 28 28-12.56 28-28 28zm69 96c-17.65 0-32-14.35-32-32s14.35-32 32-32 32 14.35 32 32-14.35 32-32 32zm56-112c-13.23 0-24-10.77-24-24s10.77-24 24-24 24 10.77 24 24-10.77 24-24 24z"/></svg></button>
            <button @click.stop="changePassword" class="fill-current mt-2 md:mt-0 p-1 w-1/3 md:w-1/12 ml-2 flex bg-blue-500 justify-center items-center text-white rounded-md focus:outline-none"><svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" /></svg></button>
            <button @click.stop="deletePatient" class="fill-current mt-2 md:mt-0 p-1 w-1/3 md:w-1/12 ml-2 flex bg-red-500 justify-center items-center text-white rounded-md focus:outline-none"><svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg></button>
        </div>
    </div>
</template>

<script>
export default  {
    // Data
    name: "PatientCard",
    props: {
        patient: Object,
        index : Number
    },
    data : function(){ 
        return{
            showModal: false 
        }
    },
    methods : {
        covidCheck : function(){
            this.$emit("check-covid", this.patient);
        },
        deletePatient : function(){
            this.$emit("delete-patient", this.patient);
        },
        changePassword : function(){
            this.$emit("change-password", this.patient);
        }
    }
}
</script>

