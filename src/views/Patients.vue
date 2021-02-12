<template>
  <div class="flex-col flex content-center py-3 mx-auto">
    <PatientSearchField @new="showEmptyPatientModal" class="md:w-4/6 md:mx-auto" @fieldsUpdated="search" title="Patient"/>
    <Pagination class="h-10 my-8 mx-auto" :pages="pages" :currentPage="searchFields.page + 1" @page-changed="pageChanged"/> 
    <div class="md:w-4/6 md:mx-auto md:h-1/4 border-gray-200 md:border-t md:border-b rounded-md md:overflow-auto">
        <PatientCard @showModal="showModal" @change-password="showPasswordModal" @check-covid="checkCovid" @delete-patient="deletePatient" :class="{'rounded-t-md': index == 0, 'rounded-b-md': index == searchFields.pageSize - 1}" class="border border-gray-200 p-2" :key="patient.id" v-for="(patient, index) in patients" :patient="patient" :index="index"/>
    </div>
    <Pagination class="h-10 my-8 mx-auto" :pages="pages" :currentPage="searchFields.page + 1" @page-changed="pageChanged"/>
    <PatientModal @savePatient="savePatient" class="z-5" ref="patientModal"/>
  </div>
</template>

<script>
import PatientSearchField from '@/components/PatientSearchField'
import PatientCard from '@/components/PatientCard'
import Pagination from '@/components/Pagination'
import PatientModal from "@/components/PatientModal";
import axios from 'axios'

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
            patients: [],
            patient_index: 0
        }
    },
    methods: {
        pageChanged: function(page){
            this.searchFields.page = page - 1;
            axios.get('/patients', {
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
            axios.get('/patients', {
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

                }).catch((err) => {
                  console.log(err);
                  this.$toast.error("Couldn't search")
                })
        },
        deletePatient: function(patient){
            console.log(patient);
        },
        showModal: function(index){
          this.patient_index = index
          console.log(this.patients[index])
          this.$refs.patientModal.showPatient(this.patients[index]);
          console.log(this.patients[index]);
        },
        showEmptyPatientModal: function(){
          this.$refs.patientModal.emptyModal();
        },
        savePatient: function(patient){
          if(patient.id){
            axios.post('/patients/update', patient,{
              headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
              }
            } ).then((result) => {
              this.patients[this.patient_index] = patient
              console.log(result)
              this.$toast.success("Patient updated successfully")
            }).catch((err) => {
              console.log(err)
              this.$toast.error("Couldn't edit patient")
            })
          }else{
            axios.post('/patients/create', patient,{
              headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
              }
            } ).then((result) => {
              console.log(result)
              this.$toast.success("Patient created successfully")
            }).catch((err) => {
              console.log(err)
              this.$toast.error("Couldn't create patient")
            })
          }
        },
        checkCovid: function(patient){
          console.log(patient)
        },
        showPasswordModal: function(patient){
          console.log(patient)
        }
    },
    mounted(){
        axios.get('/patients', {
            params: this.searchFields,
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
            }
            }).then((result) =>{
                    console.log(result.data);
                    this.patients = result.data.patients
                    if(Math.floor(result.data.patient_num / this.searchFields.pageSize) !== result.data.patient_num / this.searchFields.pageSize)
                        this.pages = Math.floor(result.data.patient_num / this.searchFields.pageSize) + 1
                    else
                        this.pages = (result.data.patient_num / this.searchFields.pageSize)

            }).catch((err) => {
              console.log(err)
              this.$toast.error("Could not fetch patients")
            })

    }
} 

</script>
