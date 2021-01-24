<template>
  <div class="font-sans items-center flex flex-col md:flex-row p-3">
    <div class="mr-5">
      <p>Name:</p>
      <input v-model="disabled.name" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Patient Name" type="text">
    </div>
    <div class="mr-5">
      <p>Start:</p>
      <DatetimePicker @change="(v) => disabled.start = startFormat(v)" class="focus-within:text-gray-600 text-gray-400" :init="false" :startFromMonday="false" :autoClose="false" :startDate="start">
        <input v-model="start" type="text" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
        <div class="absolute left-3 top-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
      </DatetimePicker>
    </div>
    <div class="mr-5">
      <p>End:</p>
      <DatetimePicker @change="(v) => disabled.duration = calcDuration(v)" class="focus-within:text-gray-600 text-gray-400" :init="false" :startFromMonday="false" :autoClose="false" :startDate="end">
        <input v-model="end" type="text" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
        <div class="absolute left-3 top-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
      </DatetimePicker>
    </div>
    <div class="">
      <p>Next:</p>
      <DatetimePicker @change="(v) => disabled.repetition = calcInterval(v)" class="focus-within:text-gray-600 text-gray-400" :init="false" :startFromMonday="false" :autoClose="false" :startDate="next">
        <input v-model="next" type="text" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
        <div class="absolute left-3 top-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
      </DatetimePicker>
    </div>
    <div class="h-1/4 w-full md:w-1/12 flex flex-row ml-auto content-end">
      <button v-if="edited" @click="save" class="fill-current mt-2 md:mt-0 p-1 w-1/2 md:w-5/12 ml-2 flex bg-green-500 justify-center items-center text-white rounded-md focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <button @click="$emit('delete', {obj: disabled, index: index})" :class="{'w-1/2': edited, 'w-full': !edited}" v-if="!nodelete" class="fill-current mt-2 md:mt-0 p-1 md:w-5/12 ml-2 flex bg-red-500 justify-center items-center text-white rounded-md focus:outline-none"><svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg></button>
    </div>
  </div>
</template>

<script>
import DatetimePicker from "@/components/DatetimePicker";
import dayjs from "dayjs";
export default {
  name: "DisabledCard",
  components: {DatetimePicker},
  props: {
    rule: Object,
    index: Number,
    nodelete: Boolean
  },
  data: function(){
    return {
      disabled: Object.assign({}, this.rule)
    }
  },
  computed: {
    end: function(){
      if(this.disabled.start === '') {
        console.log("EMPTY")
        return dayjs().format('YYYY-MM-DDTHH:mm');
      }
      return dayjs(this.disabled.start).add(this.disabled.duration, 'ms').format('YYYY-MM-DDTHH:mm');
    },
    next: function(){
      if(this.disabled.start === '') {
        console.log("EMPTY")
        return dayjs().format('YYYY-MM-DDTHH:mm');
      }
      return dayjs(this.disabled.start).add(this.disabled.duration + this.disabled.repetition, 'ms').format('YYYY-MM-DDTHH:mm');
    },
    start: function(){
      if(this.disabled.start === '') {
        console.log("EMPTY")
        return dayjs().format('YYYY-MM-DDTHH:mm');
      }
      return dayjs(this.disabled.start).format('YYYY-MM-DDTHH:mm');
    },
    edited: function(){
      let same = true
      same = same && this.disabled.name === this.rule.name
      same = same && this.disabled.duration === this.rule.duration
      same = same && this.disabled.repetition === this.rule.repetition
      console.log(this.disabled)
      console.log(this.rule)
      return !same
    }
  },
  methods: {
    save: function(){
      this.rule = this.disabled
      this.$emit('save', {'obj': this.disabled, 'index':this.index})
    },
    calcDuration: function(dateStr){
      return dayjs(dateStr).diff(this.start, 'ms');
    },
    calcInterval: function(dateStr){
      return dayjs(dateStr).diff(this.end, 'ms');
    },
    startFormat: function(dateStr){
      return dayjs(dateStr).format('YYYY-MM-DDTHH:mmZ');
    }
  }
}
</script>

