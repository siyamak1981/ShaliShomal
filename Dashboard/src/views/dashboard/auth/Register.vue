<template>
  <v-card class="mx-auto my-8" color="dark"  max-width="600">

          <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Register User
            </div>

            <div class="subtitle-1 font-weight-light pa-3">
                <v-icon>
              mdi-pen-remove 
              </v-icon>
            </div>
          </template>
            <v-alert v-if="errorPasswordAgain" dismissible type="error">
                    {{errorPasswordAgain}}
                </v-alert>
            <v-alert v-else-if="erroremail" dismissible type="warning">
                    {{erroremail}}
                </v-alert>
    <v-form ref="form" v-model="valid" lazy-validation class="pa-8" @submit.prevent="register">
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

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
      <v-text-field
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        :rules="[passwordrules.required, passwordrules.min]"
        name="input-10-2"
        label="c_password"
        value="C_Password"
        v-model="password_confirmation"
        @click:append="show = !show"
      >
      </v-text-field>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" type="submit" @click="validate">
        Submit
      </v-btn>

      <v-btn color="pink" class="mr-4"><router-link class="login" :to="{name:'Login'}">Login</router-link>
      </v-btn>
      
    </v-form>
    </base-material-card>
  </v-card>
</template>
<script>
import Swal from 'sweetalert2';
import Vue from "vue"
window.Fire = new Vue()

export default {
    name:"DashboardButtons",
    data: () => ({
    
        show: false,
        errorPasswordAgain:'',
        erroremail:'',
        password: "",
        rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
        
        },
        valid: true,
        name: "",
        nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
        ],
        email: "",
        emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password_confirmation: "",
        passwordrules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
        },
    
        checkbox: false
    }),

    methods: {
        validate() {
        this.$refs.form.validate();
        },
    register() {

        if (this.password !== this.password_confirmation) {
                    this.errorPasswordAgain = "Passwords do not match.";
                }
                if (this.email) {
                    this.erroremail = "The email has already been taken. please Login .";
                }
                this.$Progress.start()
                this.$store
                    .dispatch("register", {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    })
                    .then(response => {
                    // Fire.$emit('AfterCreate');
                        this.$router.push('/');
                        console.log(response.data)
                        Swal.fire({
                            toast:true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'You logged In successfully',
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
};
</script>
<style>
.login{
  text-decoration:none;
  
}
</style>