<template>
    <div class="container max-w-full mx-auto py-24">
        <LoginForm v-on:loginSuccess="$parent.setLoginStatus(true)"/>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'; 

export default{
    components : {
        LoginForm
    }
}
</script>
