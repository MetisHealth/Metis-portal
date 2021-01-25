<template>
    <div class="md:flex flex-col md:flex-row md:min-h-screen w-full h-full">
      <div v-if="loggedin && !hideSidebar && display" class="border-r-2 flex flex-col w-full md:w-56 mr-2 text-gray-700 bg-gray-100 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ collapsed : false }">
        <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Metis Portal</a>
          <button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" @click="toggleNavbar">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav :class="{'block': collapsed, 'hidden': !collapsed}" class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <router-link to="/calendar" active-class="bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600" class="bg-transparent dark-mode:bg-transparent block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('calendar')">Calendar</router-link>
          <router-link v-if="role === 'DOCTOR' || role === 'ADMIN'" to="/patients" active-class="bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600" class="bg-transparent dark-mode:bg-transparent block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('patients')">Patients</router-link>
          <router-link v-if="role === 'ADMIN'" to="/users"  active-class="bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600" class="bg-transparent dark-mode:bg-transparent block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('users')">Users</router-link>
          <router-link v-if="role === 'DOCTOR' || role === 'ADMIN'" to="/disabled" active-class="bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600" class="bg-transparent dark-mode:bg-transparent block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('disabled')">Disabled</router-link>
          <router-link to="/profile" active-class="bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600" class="bg-transparent dark-mode:bg-transparent block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('profile')">Profile</router-link>
          <router-link v-if="role === 'ADMIN'" to="/settings" active-class="bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600" class="bg-transparent dark-mode:bg-transparent block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('settings')">Settings</router-link>
          <a @click="logout" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline">Log Out</a>
        </nav>
      </div>
      <router-view v-if="loggedin && display" :locale="locale" :loggedin="loggedin" class="flex-1 w-5/6"></router-view>
      <Login v-if="!loggedin && display" />
      <div v-if="!display" class="h-screen w-full flex items-center">
        <LoadingSpinner class="mx-auto"/>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Login from "@/views/Login"
import router from './router'
import LoadingSpinner from "@/components/LoadingSpinner";

export default Vue.extend({
  components : {
    LoadingSpinner,
    Login
  },
  data: function() {
      return {
        collapsed: false,        
        selected: "calendar",
        role: "DOCTOR",
        hideSidebar: false,
        loggedin: false,
        token: "",
        locale: "",
        display: false
      }
  },
  methods: {
      toggleNavbar: function (){
          this.collapsed = !this.collapsed;
      },
      selectPage: function(page){
          this.selected = page;
      },
      setLoginStatus: function(state){
          this.loggedin = state;
          if(state) {
            router.push("/calendar")
            this.$axios.get('/profile', {
              headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
              }
            }).then((result) => this.locale = result.data.user.locale)
          }
          else
              router.push("/login")
      },
      logout: function(){
        this.loggedin = false;
        window.localStorage.removeItem('JWT')
      }

  },
  async created(){
      const localStorage = window.localStorage;
      if(localStorage.getItem("JWT") == null){
          this.loggedin = false;
          this.display = true;
          router.push("/login"); 
          return;
      }
      try{
         const response = await this.$axios.get('/profile',{
             headers : {
                'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
             }
         })
          console.log(response);
         if(response.data.code == 200){
            this.locale = response.data.user.locale;
            this.loggedin = true;
         }else{
            this.loggedin = false;
         }
      }catch(err){
          console.log(err);
          this.loggedin = false;
      }
      this.token = localStorage.getItem("JWT");
      this.display = true;
  }
})
</script>
