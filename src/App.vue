<template>
    <div class="md:flex flex-col md:flex-row md:min-h-screen w-full">
      <div v-if="loggedin && !hideSidebar" class="border-r-2 flex flex-col w-full md:w-56 mr-2 text-gray-700 bg-gray-100 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ collapsed : false }">
        <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Metis Portal</a>
          <button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" @click="toggleNavbar">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav :class="{'block': collapsed, 'hidden': !collapsed}" class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <router-link to="/calendar" :class="{'bg-transparent dark-mode:bg-transparent': selected != 'calendar', 'bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600': selected=='calendar'}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('calendar')">Calendar</router-link>
          <router-link to="/patients" :class="{'bg-transparent dark-mode:bg-transparent': selected != 'patients', 'bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600': selected=='patients'}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('patients')">Patients</router-link>
          <router-link to="/users" :class="{'bg-transparent dark-mode:bg-transparent': selected != 'users', 'bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600': selected=='users'}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('users')">Users</router-link>
          <router-link to="/disabled" :class="{'bg-transparent dark-mode:bg-transparent': selected != 'disabled', 'bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600': selected=='disabled'}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('disabled')">Disabled</router-link>
          <router-link to="/profile" :class="{'bg-transparent dark-mode:bg-transparent': selected != 'profile', 'bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600': selected=='profile'}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('profile')">Profile</router-link>
          <router-link to="/settings" :class="{'bg-transparent dark-mode:bg-transparent': selected != 'settings', 'bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600': selected=='settings'}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click.native="selectPage('settings')">Settings</router-link>
          <a :class="{'bg-transparent dark-mode:bg-transparent': selected != 'logout', 'bg-gray-200 dark-mode:text-white dark-mode:bg-gray-600': selected=='logout'}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline" @click="selectPage('logout')">Log Out</a>
        </nav>
      </div>
      <router-view class="flex-1 w-5/6"></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import { StorageManagement } from "@sebgroup/frontend-tools";
import router from './router'

export default Vue.extend({ 
  data: function() {
      return {
        collapsed: false,        
        selected: "calendar",
        role: "DOCTOR",
        hideSidebar: false,
        loggedin: false,
        token: ""
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
          if(state)
              router.push("/calendar")
          else
              router.push("/login")
      },


  },
  created(){
      const localStorage = new StorageManagement("LOCAL");
      if(localStorage.getItem("JWT") == null){
          this.loggedin = false;
          router.push("/login"); 
          return;
      }
      this.loggedin = true;
      this.token = localStorage.getItem("JWT"); 
  }
})
</script>
