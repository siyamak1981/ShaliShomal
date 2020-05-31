<template>
<div class="container">
  <v-card class="mx-auto my-8" color="dark"  max-width="600" v-if="tokenHidden">
    <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
           Token Form
            </div>

            <div class="subtitle-1 font-weight-light pa-3">
                <v-icon>
             mdi-face
              </v-icon>
            </div>
          </template>
    <v-form ref="form" lazy-validation class="pa-8" @submit.prevent="validateToken">
      <v-text-field
        v-model="token"
          :rules="[tokenRules.required, tokenRules.min]"
        label="Token"
        required
      ></v-text-field>
      <v-btn color="success" type="submit" class="mr-4" @click="validate">
        Click
      </v-btn>
    </v-form>
    </base-material-card>
  </v-card>
   <v-card class="mx-auto my-8" color="dark"  max-width="600" v-if="tokenValid">
    <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
                New Password
            </div>

            <div class="subtitle-1 font-weight-light pa-3">
                <v-icon>
             mdi-face
              </v-icon>
            </div>
          </template>
    <v-form ref="form" lazy-validation class="pa-8" @submit.prevent="changePassword">
      <v-text-field
        v-model="newPassword"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="enter new password"
        hint="At least 8 characters"
        counter
        @click:append="show = !show"
      ></v-text-field>
      <v-text-field
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        name="input-10-2"
        label="new password again"
        value="Password Again"
        v-model="passwordAgain"
        @click:append="show = !show"
        v-bind:class="{ 'is-invalid': errorPasswordAgain }"
      ></v-text-field>

      <v-btn color="success" type="submit" class="mr-4">
        Submit
      </v-btn>
    </v-form>
</base-material-card>
  </v-card>
  </div>
</template>
<script>
import axios from "axios"
export default {
  
  data: () => ({
    name: "token",
    show: false,
    tokenHidden:true,
    newPassword: "",
    passwordAgain: "",
    tokenValid: false,
    errorPasswordAgain:null,
    user: null,
    token: "",
    tokenRules: {
        required: value => !!value || "Token is required.",
        min: v => v.length >= 8 || "Min 8 characters"
    },
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },
  }),
 
    methods: {
        validate() {
          this.$refs.form.validate();
    },
     validateToken(){
          const data = {
                  token: this.token
                  }
          axios.post("/auth/validate-token/",data
          )
          .then((response)=>{
            if(response.data.id){
              this.tokenValid = true;
              this.tokenHidden = false;
              this.user=response.data
              console.log(response.data)
            }
          }).catch((error)=>{
            console.log(error)
            this.$router.push({name:"ForgetPassword"})
         
          })
     },
     changePassword() {
           if (this.newPassword != this.passwordAgain) {
                this.errorPasswordAgain = "Passwords do not match.";
                alert(this.errorPasswordAgain)
            }
            if (!this.errorPasswordAgain) {
                const data = {
                    password: this.newPassword,
                    user_id: this.user.id
                };
                axios.post("/auth/reset-password", data)
                this.$router.push({name:'Login'})
                .then(() => {
                     Swal.fire({
                            toast:true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Password changed successfully',
                            showConfirmButton: false,
                            timer: 3000
                            })
                            .catch(()=>{
                                   Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                    
                                })
                            })
                });
            }
          }
        }
    }
</script>
<style>
.New-Password{
  text-decoration:none;
}
</style>