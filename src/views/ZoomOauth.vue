<template>
  <div><p>Redirecting...</p></div>
</template>

<script>
import axios from "axios";
import router from '../router'

export default {
  name: "ZoomOauth",
  mounted(){
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code)
    axios.get('/profile/zoom/authorization', {
      params: {
        code: code
      },
      headers:{
        'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
      }
    }).then(() => {
      router.push("/profile")
    }).catch(() => { this.$toast.error("An error occured.")});
  }
}
</script>
