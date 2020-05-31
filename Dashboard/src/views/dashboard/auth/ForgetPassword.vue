<template>
  <v-card class="mx-auto my-8" color="dark" max-width="600">
 <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Email Test
            </div>

            <div class="subtitle-1 font-weight-light pa-3">
                <v-icon>
             mdi-face
              </v-icon>
            </div>
          </template>
    <v-form ref="form" lazy-validation class="pa-8" @submit.prevent="sendToken">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-btn color="success" type="submit" class="mr-4" @click="validate">
        Send token to Email
      </v-btn>
      <v-btn color="pink" class="ma-4"><router-link class="token" :to="{name:'Token'}">Put the Token</router-link>
      </v-btn>
    </v-form>
</base-material-card>
  </v-card>
</template>
<script>
import axios from "axios"
export default {
  name: "password-reset",

  data: () => ({
    token:"",
    user: null,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
    
 
    methods: {
     validate() {
      this.$refs.form.validate();
     },
      sendToken() {
              axios.post("/auth/send-token/",{
              email:this.email
              })
              .then(()=>{
                    this.$router.push({name:"Token"})
                    Swal.fire({
                                toast:true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Token sent to your email successfully',
                                showConfirmButton: false,
                                timer: 3000
                                })
                        })
                    .catch(()=>{
                    Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href>Why do I have this issue?</a>'
                        })
                    })
          }
        },
      
    }

</script>
<style>
.token{
  text-decoration:none;
}
</style>