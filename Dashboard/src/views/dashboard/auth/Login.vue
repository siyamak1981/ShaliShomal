<template>
  <v-card class="mx-auto my-8" color="dark" max-width="600">
   <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Login User
            </div>

            <div class="subtitle-1 font-weight-light pa-3">
                <v-icon>
              mdi-pen-remove 
              </v-icon>
            </div>
          </template>
    <v-form ref="form" lazy-validation class="pa-8" @submit.prevent="login">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="show = !show"
      ></v-text-field>

      <v-btn color="success" type="submit" class="mr-4" @click="validate">
        Submit
      </v-btn>

      <v-btn color="warning" class="ma-4"><router-link class="resetpassword" :to="{name:'Register'}"> SignUP</router-link>
      </v-btn>
      <v-btn color="pink" class="ma-4"><router-link class="resetpassword" :to="{name:'ForgetPassword'}">Forgot Password</router-link>
        
      </v-btn>
    </v-form>
    </base-material-card>
  </v-card>
</template>
<script>
import Swal from 'sweetalert2';
export default {
  name:"DashboardLogin",
  data: () => ({
    show: false,

    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },

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
     login() {
       
        this.$Progress.start()
            this.$store
                .dispatch("retrieveToken", {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                   
                    this.$router.push('/');
                    console.log(response.data)
                     Swal.fire({
                          toast:true,
                          position: 'top-end',
                          icon: 'success',
                          title: 'You Logged In to Dashboard sueccessfully',
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
                 this.$Progress.finish()
        }

      }
  }

  
</script>
<style>
.resetpassword{
  text-decoration:none;
}
</style>