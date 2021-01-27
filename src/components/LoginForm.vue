<template>
      <div class="font-sans container max-w-full mx-auto py-24">
      <div class="max-w-lg mx-auto px-6">
        <div class="relative flex flex-wrap">
          <div class="w-full relative">
            <div class="mt-6">
              <div class="text-center font-semibold text-black">
                Metis Portal
              </div>
              <p class="flex justify-center inline-block align-middle text-center text-red-500 mt-8 w-auto self-center flex-1" v-if="loginError">
                <span class="inline-block align-middle">
                    <svg class="h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </span>
                {{ errorMsg }}
              </p>
              <div class="mt-8">
                <div class="mx-auto max-w-lg">
                  <div class="py-2">
                    <span class="px-1 text-sm text-gray-600">Email</span>
                    <input :class="{'border-gray-300' : emailValid, 'border-red-500': !emailValid}" v-model="email" placeholder="" type="text"
                      class="text-md block px-3 py-2  rounded-lg w-full 
                    bg-white border-2 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                  </div>
                  <div class="py-2">
                    <span class="px-1 text-sm text-gray-600">Password</span>
                    <div class="relative">
                      <input v-on:keyup.enter="apiLogin" v-model="password" placeholder="" :type="!showPassword ? 'password' : 'text'" class="text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                    focus:placeholder-gray-500
                    focus:bg-white 
                    focus:border-gray-600  
                    focus:outline-none">
                      <div @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">                      
                        <svg  v-if="showPassword" class="h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-if="!showPassword" class="h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between"><label class="block text-gray-500 font-bold my-4"><input v-model="rememberme" type="checkbox"
                        class="leading-loose text-pink-600"> <span class="py-2 text-sm text-gray-600 leading-snug"> Remember
                        Me </span></label> <label class="block text-gray-500 font-bold my-4"><a
                        href="#"
                        class="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"><span>Forgot
                          Password?</span></a></label></div> 
                  <button @click="apiLogin" class="mt-3 text-lg font-semibold
                    bg-gray-800 w-full text-white rounded-lg
                    px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                    Login
                  </button>
                </div>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { StorageManagement, isEmail } from "@sebgroup/frontend-tools";
import axios from 'axios'

export default  {
    // Data
    name: "LoginForm",
    data : function(){ 
        return{
            email : "",
            password : "",
            errorMsg : "",
            showPassword : false,
            loginError : false,
            rememberme : false,
            emailValid : true,
        }
    },
    // Methods
    methods:{
        apiLogin: function() {
                if(!isEmail(this.email)){
                    this.emailValid = false
                    return
                }
                this.emailValid = true
                this.loginError = false
                axios.post('/login', {
                    email: this.email,
                    password: this.password
                  })
                  .then((response) => {
                      const storageManagement = new StorageManagement("LOCAL");
                      storageManagement.setItem("JWT", response.data.token);
                      storageManagement.setItem("expiry", response.data.expiry);
                      this.$emit('loginSuccess');
                  })
                  .catch((error) => {
                      if(error.response){
                          if(error.response.status == 403)
                              this.errorMsg = "Wrong username or password"
                          else
                              this.errorMsg = "Internal server error"
                      }else{
                          this.errorMsg = "An unknown error occured"
                      }
                      this.loginError = true
                  });
        }
    }
}
</script>

