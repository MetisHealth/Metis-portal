<template>
  <div class="calendar w-full h-screen" ref="calendarContainer">
      <AppointmentModal @createdEvent="createdEvent" class="z-5" ref="newAppointmentModal"/>
      <FullCalendar class="z-0 w-full px-3 md:px-12 py-5" ref="fullCalendar" :options="calendarOptions" />
      <div v-on-clickaway="hidePopover" ref="popoverRef" v-bind:class="{'hidden': !popoverShow, 'block': popoverShow}" class="border-2 w-48 border-gray-200 bg-white border-0 mr-3 block z-50 font-normal leading-normal text-sm text-left no-underline break-words rounded-lg">
        <div>
          <div data-popper-arrow></div>
          <div class="border-black bg-gray-300 text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg">
            Appointment 
          </div>
          <div class="border-black p-3">
              <p><strong>Name: </strong>{{ selectedEvent.extendedProps.patient.name }}</p>
              <p><strong>Phone: </strong>{{ selectedEvent.extendedProps.patient.phone }}</p>
              <p><strong>COVID: </strong>{{ selectedEvent.extendedProps.patient.safe }}</p>
              <div class="w-full flex justify-center mt-2">
              <button @click="deleteAppointment" type="button" class="p-1 z-5 bg-red-400 text-white w-1/2 rounded-md">
                <svg class="h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import allLocales from '@fullcalendar/core/locales-all';
import AppointmentModal from '@/components/AppointmentModal'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import { mixin as clickaway } from 'vue-clickaway';
import Popper from "popper.js";

export default {
    name: "Calendar",
    components: {
        FullCalendar,
        AppointmentModal
    },
    mixins: [ clickaway ],
    props: {
        locale: String,
    },
    data: function(){
            return {
                calendarElementClickedLast: false, // This solution is not elegant but works nonethelesss
                selectedEvent : {extendedProps : {patient: {name: "John", phone:"55555", safe:true}, online:false, id:null}}, 
                popoverShow: false,
                calendarOptions : {
                    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
                    selectMirror: true,
                    initialView: 'timeGridWeek',
                    eventOverlap: false,
                    selectOverlap: false,
                    firstDay: 1,
                    allDaySlot: false,
                    aspectRatio: 2,
                    scrollTime: "07:00:00",
                    locales: allLocales,
                    locale: this.locale,
                    select: this.selectSlot,
                    selectable: true,
                    editable: true,
                    eventClick: this.eventClicked,
                    headerToolbar: {
                        left: 'prev,next,today',
                        right: 'timeGridDay,timeGridWeek,dayGridMonth',
                        height: "80%"
                    },
                    eventSources: [this.getEvents, this.getDisabled]
              }
        }
    },
    methods: {
        createdEvent: function(event){
            this.$refs.fullCalendar.getApi().addEvent(event)
        },
        hidePopover: function(){
          if(!this.calendarElementClickedLast)
            this.popoverShow = false;
          this.calendarElementClickedLast = false
        },
        deleteAppointment: function(){
            axios.post('http://localhost:9090/appointments/delete',this.selectedEvent.extendedProps.appObj,{
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
                },
                }).then((_) => { // eslint-disable-line no-unused-vars
                    this.selectedEvent.remove();
                    this.popoverShow = false;
                }) 
        },
        eventClicked: function(info){
            console.log()
            if(this.popoverShow && info.event.id == this.selectedEvent.id){
                this.popoverShow = false;
                return;
            }
            this.popoverShow = true;
            this.calendarElementClickedLast = true;
            this.selectedEvent = info.event;
            new Popper(info.el, this.$refs.popoverRef, {
                placement: "left",
                'visible-arrow': true
            });
        },
        selectSlot: function(info){ // Read the docs to find type
            this.$refs.newAppointmentModal.displayModal(info.start, info.end);
            console.log(info)
        },
        getEvents: function(info, successCallback, failureCallback){
            axios.get('http://localhost:9090/appointments', {
                params: {
                    start: info.startStr,
                    end: info.endStr
                },
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
                }
                })
            .then((appointments) => {       
                console.log(appointments.data)
                const events = appointments.data.map(function(x) {
                                return {
                                title: x.patient.name,
                                start: x.start,  
                                end: x.end,
                                backgroundColor: x.patient.safe ? "#1266F1" : "#FF9100",
                                extendedProps: {
                                    id: x.id,
                                    phone: x.patient.phone,
                                    safe: x.patient.safe,
                                    online: x.online,
                                    zoom: x.zoomUrl,
                                    patient: x.patient,
                                    appObj: x
                                }
                                }
                            })
                console.log(events)
                successCallback(events)
                })
            .catch((err) => {
                console.log(err);
                console.log("ERROR PLACEHOLDER");
                failureCallback(err)
             });
        },
        getDisabled: function(info, successCallback, failureCallback){
            axios.get('http://localhost:9090/disabled', {
                params: {
                    start: info.startStr,
                    end: info.endStr
                },
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
                }
                })
            .then((disabled) => {       
                let disabledSlots = [];
                for(var n in disabled.data){
                    disabledSlots = disabledSlots.concat(disabled.data[n].map(function(x){
                        return {
                            title: n,
                            start: x[0],
                            end: x[1],
                            display: 'background',
                            backgroundColor: '#757575',
                            foregroundColor: "#000000"
                        }
                      }));
                }
                successCallback(disabledSlots)
                })
            .catch((err) => {
                console.log(err);
                console.log("ERROR PLACEHOLDER");
                failureCallback(err)
             });
          },
        updateAspectRatio: function(){
            var w = this.$refs.calendarContainer.clientWidth;
            var h = this.$refs.calendarContainer.clientHeight;
            if(w < 640){
                this.$refs.fullCalendar.getApi().changeView('timeGridDay')
                this.$refs.fullCalendar.getApi().setOption('aspectRatio', w / h + 0.04)
                return;
            }
            this.$refs.fullCalendar.getApi().setOption('aspectRatio', w / h + 0.15)
        }
    },
    watch: {
        locale: function(newLocale, _){ // eslint-disable-line no-unused-vars
            this.$refs.fullCalendar.getApi().setOption('locale', newLocale)
        }
    },
    created() {
        window.addEventListener("resize", this.updateAspectRatio);
    },
    destroyed() {
        window.removeEventListener("resize", this.updateAspectRatio);
    },
    mounted() {
        this.updateAspectRatio()
    }
} 

</script>
