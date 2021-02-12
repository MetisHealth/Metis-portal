<template>
  <div v-if="profile !== {}" >
    <div class="w-10/12 md:mt-8 md:w-7/12 mx-auto p-5 rounded-lg border-gray-100 border-2">
        <div class="flex flex-col items-center space-x-4">
          <div class="ml-4 w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Name:</label>
            <input v-model="profile.name" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
          </div>
          <div class="w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Phone:</label>
            <input v-model="profile.phone" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
          </div>
          <div class="w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">E-Mail:</label>
            <input v-model="profile.email" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
          </div>
          <div class="w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">TC:</label>
            <input v-model="profile.tcno" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
          </div>
          <div class="w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Hes:</label>
            <input v-model="profile.hescode" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
          </div>
          <div class="w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center">Locale:</label>
            <select v-model="profile.locale" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="Patient Name">
              <option value="tr">Turkish</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <div class="pt-1 flex items-center space-x-4">
          <button @click="saveClicked" class="ml-auto bg-blue-500 flex justify-center items-center w-2/12 text-white px-2 py-2 rounded-md focus:outline-none">Save</button>
        </div>
      </div>
      <div class="w-10/12 md:mt-8 md:w-7/12 mx-auto p-5 rounded-lg border-gray-100 border-2">
        <div class="flex flex-col items-center space-x-4">
          <div class="ml-4 w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center w-1/5">Old Password:</label>
            <input v-model="oldpass" type="password" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="">
          </div>
          <div class="w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center w-1/5">New Password:</label>
            <input v-model="newpass" type="password" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="">
          </div>
          <div class="w-full flex flex-col md:flex-row md:mb-3">
            <label class="bg-gray-200 border-gray-300 border rounded-l-md p-1 px-2 text-gray-600 flex items-center w-1/4">Confirm Password:</label>
            <input v-model="confirmpass" type="password" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-r-md focus:outline-none text-gray-600" placeholder="">
          </div>
        </div>
        <div class="pt-1 flex items-center space-x-4">
          <button @click="updatePassword" class="ml-auto bg-blue-500 flex justify-center items-center w-2/12 text-white px-2 py-2 rounded-md focus:outline-none">Save</button>
        </div>
      </div>
    <div v-if="profile.role !== 'PATIENT'" class="w-10/12 md:mt-8 md:w-7/12 mx-auto p-5 rounded-lg border-gray-100 border-2">
        <div class="ml-4 w-full flex flex-col md:flex-row md:mb-3">
          <button @click="sendSms" :disabled="!hesvalidate" :class="{'bg-gray-200 border-gray-300 text-gray-600 border': !hesvalidate, 'bg-blue-500 border-0 text-white': hesvalidate}" class="rounded-l-md p-1 px-2 flex items-center w-1/6">Send SMS</button>
          <input :disabled="hesvalidate" v-model="smscode" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 focus:outline-none text-gray-600" placeholder="SMS Code">
          <button @click="saveHesApi" :disabled="hesvalidate" :class="{'bg-gray-200 border-gray-300 text-gray-600 border': hesvalidate, 'bg-blue-500 border-0 text-white': !hesvalidate}" class="rounded-r-md p-1 px-2 flex items-center w-1/6">Save</button>
        </div>
        <div class="ml-4 w-full flex flex-col md:flex-row md:mb-3">
          <a class="bg-blue-500 border-0 text-white rounded-md p-1 px-2 flex items-center w-2/6 mt-2 py-2" :href="zoom_oauth_url">Connect to ZOOM</a>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data: function() {
    return {
      profile: {},
      oldpass: "",
      newpass: "",
      confirmpass: "",
      hesvalidate: true,
      smscode: "",
      zoom_oauth_url:`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.VUE_APP_ZOOM_CLIENT_ID}&redirect_uri=${window.location.origin}/oauth/zoom`
    }
  },
  methods: {
    saveClicked: function () {
      axios.post('/profile', this.profile, {
        headers:{
          'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
          }
      }).then(() => {
        this.$toast.success("Profile information saved successfully.");
      })
      .catch(() => { this.$toast.error("An error occured.")});
    },
    updatePassword: function(){
      if(this.newpass !== this.confirmpass){
        this.$toast.error("New passwords do not match.")
        return;
      }
      axios.post("/profile/password", `oldPassword=${encodeURI(this.oldpass)}&newPassword=${encodeURI(this.newpass)}`,{
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
          }
      }).then((result) => {
        if(result.data.code !== 200){
          this.$toast.error(result.data.message);
          return;
        }
        this.$toast.success("Password changed successfully!")
      })
      .catch(() => {this.$toast.error("An unknown error occured!")})
    },
    sendSms: function(){
      this.hesvalidate = false
      axios.get("/profile/hes/sendsms", {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        }
      }).then(() => {
        this.$toast.info("An SMS was sent to your mobile phone")
      }).catch(() => {
        this.$toast.error("An error occured!");
        this.hesvalidate = true;
      })
    },
    saveHesApi: function(){
      axios.get("/profile/smscode", {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        },
        params: {
          code: this.smscode
        }
      }).then(() => {
        this.$toast.info("Connection to HES successful")
      })
    }
  },
  mounted(){
    axios.get('/profile', {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
      }
    }).then((result) => {
      this.profile = result.data.user
      console.log(this.profile)
    })
  }
}
</script>
