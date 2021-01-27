<template>
  <div class="flex-col flex content-center py-6 mx-auto mt-8">
    <div class="md:w-4/6 md:mx-auto border-gray-200">
      <DisabledCard @save="createRule" class="rounded-md border border-gray-200 p-2 mb-3" :rule="{start: '', duration: '', repetition: ''}" ref="newRule" :nodelete="true"/>
      <DisabledCard :nodelete="false" @delete="deleteRule" @save="updateRule" class="rounded-md border border-gray-200 p-2 mb-3" :key="rule.id" v-for="(rule, index) in rules" :rule="rule" :index="index"/>
    </div>
  </div>
</template>

<script>
import DisabledCard from "@/components/DisabledCard";
import axios from 'axios'

export default {
  name: "Disabled",
  components: {DisabledCard},
  data: function(){
    return {
      rules: []
    }
  },
  methods: {
    updateRule: function(rule){
      axios.post('/disabled/update', rule.obj,{
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        }
      }).then((result) =>{
        this.rules[rule.index] = rule.obj;
        console.log(result)
      }).catch((err) => {
        console.log(err);
        this.$toast.error("Couldn't update rule")
      })
    },
    createRule: function(rule){
      axios.post('/disabled', rule.obj,{
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        }
      }).then((result) =>{
        this.rules.push(rule.obj);
        this.$refs.newRule.disabled = {start: '', duration: '', repetition: ''}
        console.log(result)
      }).catch((err) => {
        console.log(err)
        this.$toast.error("Couldn't create rule")
      })
    },
    deleteRule: function(rule){
      axios.get('/disabled/delete', {
        params: {
          id: rule.obj.id
        },
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
        }
      }).then((result) =>{
        this.rules.splice(rule.index)
        console.log(result)
      }).catch((err) => {
        console.log(err)
        this.$toast.error("Couldn't delete rule")
      })
    },
  },
  mounted(){
    axios.get('/disabled/rules', {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('JWT')}`
      }
    }).then((result) =>{
      console.log(result.data)
      this.rules = result.data
    }).catch((err) => {
      console.log(err);
      this.$toast.error("Couldn't fetch rules")
    })

  }
}
</script>
