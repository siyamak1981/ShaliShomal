<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile {{name}}
            </div>
          </template>

          <v-form @submit.prevent="updateInfo()" enctype="multipart/form-data">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    class="purple-input"
                    label="Name"
                    v-model="name"
               
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="email"
                    type="email"
                  
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
                <v-col
                  cols="12"
                  md="12"
                >
                <input type="file" @change="updatePhoto" name="photo" class="form-input">
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    v-model="bio"
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
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
           alt="User Avatar"
        >
           <v-img
                  :src="get_photo(photo)" 
                  :class="{ posimg:!isStock }"
                  aspect-ratio="1"
                  class="mx-auto"
                  max-width="100"
            
                > </v-img>
     
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              {{ type }}
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
             {{ name }}
            </h4>

            <p class="font-weight-light grey--text">
              {{bio}}
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
 .posimg{
          border-radius: 50%;
         }
         </style>
<script>

import axios from 'axios'
   export default {
     name:"ProfileDashboard",
       data: () => ({
        isStock:false,
          id:'',
          name : '',
          email: '',
          password: '',
          type: '',
          photo:'',
          photo_1 : '1588144368.jpeg',
          bio: '',
          items: [
              'Admin',
              'User',
              'SuperUser',
              'Author',
          ],
    }),
       
        methods:{
          get_photo(){
            
                let photo = 'http://localhost:8000/img/profile/'+ this.photo ;
                return photo;
                        
            },

            updateInfo(){
                this.$Progress.start();
                if(this.password == ''){
                    this.password = undefined;
                }
                 
                const token = localStorage.getItem('access_token');
                axios.put(`auth/update_profile` ,
                     {
                      name:this.name,
                      email:this.email,
                      password:this.password,
                      type:this.type,
                      photo:this.photo,
                      bio:this.bio
                      },
              {
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${ token }`
                  },
              })
             
                .then((response)=>{
                  this.$router.push({name:"Dashboard"})
                  console.log(response);
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
                    this.$Progress.fail();
                });
            },
            updatePhoto(e){
                const file = e.target.files[0];
                const reader = new FileReader();

                const limit = 1024 * 1024 * 2;
                if(file['size'] > limit){
                     Swal.fire({
                      toast:true,
                      position: 'top-end',
                      icon: 'error',
                      title: 'You are uploading a large file',
                      showConfirmButton: true,
                      timer: 4000
                    })
                    return false;
                }

                reader.onloadend = (file) => {
                    this.photo = reader.result;
                    
                }
                reader.readAsDataURL(file);
            }
        },

            async mounted() {
                const token = localStorage.getItem('access_token');
              await  axios.get("/auth/profile" ,
              {
                    headers:{'Authorization':`Bearer ${ token }`}
          
              })
      
            .then(response => {
                this.name = response.data.name
                this.email = response.data.email
                this.type = response.data.type
                this.bio = response.data.bio
                 this.photo = response.data.photo
                console.log(response)
          
            } 
              )
            .catch((error)=>{
                  console.log(error)
                })  
            }
   }
        
    
</script>
