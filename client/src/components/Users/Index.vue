<template>
 <div>
    <h1> Get All Users </h1>
    <h4>จำนวนผู้ใช้งาน {{ users.length }}</h4>

   <p> <button v-on:click="navigateTo('/user/create/')">สร้างผู้ใช้</button></p>

    <div v-for="user in users" v-bind:key="user.id">

        <div>id : {{ user.id }}</div>
        <div>ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</div>
        <div>email : {{ user.email }}</div>
        <div>password : {{ user.password}}</div>

        <p><button v-on:click="navigateTo('/user/'+ user.id)">ดูข้อมูลผู้ใช้</button>
        <button v-on:click="navigateTo('/user/edit/'+ user.id)">แก้ไขข้อมูล</button>
        <button v-on:click="deleteUser(user)">ลบข้อมูล</button>        </p>

        <hr>
    </div>
    
</div>
</template>
<script>

import UsersService from '@/services/UserService'

    export default {
        data () {
            return {
                users : []
            }
        },
       async created (){
         try {
           this.users = (await UsersService.index()).data
       }catch(error){
           console.log(error);
       }
        },
        methods: {
            navigateTo (route){
                this.$router.push(route)
        },
        async deleteUser(user) {
            let result = confirm("Want To Delete?")
               if(result) {
                   try {
                    await UsersService.delete(user)
                    this.refreshData()
            } catch (error){
            console.log(error)
          }
        }
         },
         async refreshData() {
             this.users = (await UsersService.index()).data
         },
        
    }
}


</script>
<style scoped>


</style>
