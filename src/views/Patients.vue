<template>
  <div class="flex-col flex content-center py-3 mx-auto">
    <PatientSearchField @new="showEmptyPatientModal" class=" md:w-4/6 md:mx-auto" @fieldsUpdated="search" title="Patient"/>
    <Pagination class="h-10 my-8 mx-auto" :pages="pages" :currentPage="searchFields.page + 1" @page-changed="pageChanged"/> 
    <div class="md:w-4/6 md:mx-auto md:h-1/4 border-gray-200 md:border-t md:border-b rounded-md md:overflow-auto">
        <PatientCard @showModal="showModal" @change-password="showPasswordModal" @check-covid="checkCovid" @delete-patient="deletePatient" :class="{'rounded-t-md': index == 0, 'rounded-b-md': index == searchFields.pageSize - 1}" class="border border-gray-200 p-2" :key="patient.id" v-for="(patient, index) in patients" :patient="patient"/>
    </div>
    <Pagination class="h-10 my-8 mx-auto" :pages="pages" :currentPage="searchFields.page + 1" @page-changed="pageChanged"/>
    <PatientModal class="z-5" ref="patientModal"/>
  </div>
</template>

<script>
import PatientSearchField from '@/components/PatientSearchField'
import PatientCard from '@/components/PatientCard'
import Pagination from '@/components/Pagination'
import PatientModal from "@/components/PatientModal";

export default {
    name: "Patients",
    components: {
      PatientModal,
        PatientSearchField,
        Pagination,
        PatientCard
    },
    props: {
    },
    data: function(){ return {
            searchFields: {
                name: "",
                email: "",
                phone: "",
                pageSize: 20,
                page: 0
            },
            pages: 0,
            patients: []
        } 
    },
    methods: {
        pageChanged: function(page){
            this.searchFields.page = page - 1;
            this.$axios.get('/patients', {
                params: this.searchFields,
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
                }
                }).then((result) =>{
                        console.log(result.data);
                        this.patients = result.data.patients
                }) 
        },
        search: function(fields){
            this.searchFields = fields;
            this.searchFields.page = 0;
            this.$axios.get('/patients', {
                params: this.searchFields,
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
                }
                }).then((result) =>{
                        console.log(result.data);
                        this.patients = result.data.patients
                        if(Math.floor(result.data.patient_num / this.searchFields.pageSize) != result.data.patient_num / this.searchFields.pageSize)
                            this.pages = Math.floor(result.data.patient_num / this.searchFields.pageSize) + 1
                        else
                            this.pages = (result.data.patient_num / this.searchFields.pageSize)

                })  // TODO error handling here
        },
        deletePatient: function(patient){
            console.log(patient);
        },
        showPasswordModal: function(patient){
            console.log(patient);
        },
        checkCovid: function(patient){
            console.log(patient);
        },
        showModal: function(patient){
          this.$refs.patientModal.showPatient(patient);
          console.log(patient);
        },
        showEmptyPatientModal: function(){
          this.$refs.patientModal.emptyModal();
        }
    },
    mounted(){
        this.$axios.get('/patients', {
            params: this.searchFields,
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
            }
            }).then((result) =>{
                    console.log(result.data);
                    this.patients = result.data.patients
                    if(Math.floor(result.data.patient_num / this.searchFields.pageSize) != result.data.patient_num / this.searchFields.pageSize)
                        this.pages = Math.floor(result.data.patient_num / this.searchFields.pageSize) + 1
                    else
                        this.pages = (result.data.patient_num / this.searchFields.pageSize)

            }) // TODO err handling here as well 

    }
} 

</script>
