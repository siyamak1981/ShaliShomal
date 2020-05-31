<template>
  <v-container
    id="user-edit"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit User
            </div>

            <div class="subtitle-1 font-weight-light pa-3">
                <v-icon>
              mdi-pen-remove 
              </v-icon>
            </div>
          </template>

          <v-form @submit.prevent="updateUser()">
            <v-container class="py-0">
              <v-row>
            
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    class="purple-input"
                    label="Name"
                    v-model="name"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="email"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Password"
                    class="purple-input"
                    type="password"
                    v-model="password"
                    required
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                <v-select
                    v-model="type"
                    :items="items"
                    label="Type"
                    
                ></v-select>
              </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="bio"
                    class="purple-input"
                    label="About Me"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    type="submit"
                  >
                    Update 
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import axios from "axios"
  export default {
      name: "edit-user",
    data: () => ({
     

        name : '',
        email: '',
        password: '',
        type: '',
        bio: '',
        items: [
            'Admin',
            'User',
            'SuperUser',
            'Author',
        ],
    }),
    
     methods: {
            
            updateUser(){
                this.$Progress.start();
                axios.put(`/auth/user/${this.$route.params.userid}`,{
                  name:this.name,
                  email:this.email,
                  password:this.password,
                  type:this.type,
                  bio:this.bio
                })
                .then(() => {
                   this.$router.push({name:"User"});
                    Swal.fire({
                      toast:true,
                      position: 'top-end',
                      icon: 'success',
                      title: 'Updated sueccessfully',
                      showConfirmButton: false,
                      timer: 3000
                      })
                        this.$Progress.finish();
                       
                })
                .catch(() => {
                  //  Swal.fire("Failed!", "There was something wronge.", "warning");
                    Swal.fire({
                      toast:true,
                      position: 'top-end',
                      icon: 'error',
                      title: "There was something wronge.",
                      showConfirmButton: true,
                      timer: 3000
                    })
                    this.$Progress.fail();
                });
            },
  },
          created(user) {
                axios.get(`/auth/user/edit-user/${this.$route.params.userid}`).then(response => {
                      this.name = response.data.user.name
                      this.email = response.data.user.email
                  
                    
                })
                .catch((error)=>{
                  console.log(error)
                })            
        },      
  }
  
</script>
