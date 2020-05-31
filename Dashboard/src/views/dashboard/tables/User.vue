<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Simple Tables"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="User Table"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Name
            </th>
            <th class="primary--text">
              Email
            </th>
            <th class="primary--text">
              Type
            </th>
            <th class="primary--text">
              Create
            </th>
            <th class="text-right primary--text">
             Modify
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
           <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{user.type | capitalize}}</td>
                    <td>{{ user.created_at | myDate }}</td>
                    
            <td class="text-right">
            <v-btn icon color="indigo" :to="`edit-user/${user.id}`">
              <v-icon>
              mdi-pen-remove 
              </v-icon>
            </v-btn>
            <v-btn icon color="red" @click="deleteUser(user.id)">
              <v-icon>
                mdi-delete-alert
              </v-icon>
            </v-btn>
            </td>
          </tr>
        </tbody>
                
      </v-simple-table>
    </base-material-card>
    <div class="py-3" />
  </v-container>
</template>
<style>
.paginattable{
 list-style-type:none;
}
</style>
<script>
import axios from "axios"
window.Fire = new Vue()
import Vue from "vue";

export default{
  name:"UserTables",
  data(){
    return{
      users:{},
      id:'',
      name : '',
      email: '',
      password: '',
      type: '',
      bio: '',
      photo: '',
    
    }
  },

  methods:{
    // getResults(page = 1) {
		// 	axios.get('/auth/findUser?page=' + page)
		// 		.then(response => {
		// 		  this.users = response.data;
    //       console.log(response)
       
		// 		});
		// },
    loadusers(){
      axios.get("/auth/table-user/")
      .then((response) => (this.users = response.data.users));
  
      },

   
    deleteUser(id){
              Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                      // Send request to the server
                        if (result.value) {
                              axios.delete('/auth/user/'+id).then(()=>{
                                     Swal.fire(
                                      'Deleted!',
                                      'Your file has been deleted.',
                                      'success'
                                      )
                                  Fire.$emit('AfterCreate');
                              }).catch(()=> {
                                  Swal.fire("Failed!", "There was something wronge.", "warning");
                              });
                        }
                  })
          },
  },

    created(){
          // Fire.$on('searching',() => {
          //       let query = this.$parent.search;
          //       axios.get('auth/findUser?q=' + query)
          //       .then((response) => {
          //           this.users = response.data
          //           console.log(response.data)
          //       })
          //       .catch(() => {
          //       })
          //   })
      this.loadusers();
    //      Fire.$on('AfterCreate',() => {
    //                this.loadUsers();
    //  setInterval(() => this.loadUsers, 3000);
    //            });
    setInterval(function () {
          this.loadusers();
        }.bind(this), 3000); 
      },
} 
</script>
    
    
