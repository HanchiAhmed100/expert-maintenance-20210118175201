<template>
    <ion-page>
        <ion-header>    
            <ion-toolbar>
                <ion-title>Expert Maintenance </ion-title>
            </ion-toolbar>
        </ion-header>

        <div class="flex_all" v-if="loading">
            <ion-spinner  name="circles"></ion-spinner>
        </div>

        <ion-grid class="flex_all" v-else>
                <ion-img  class="img" src="/assets/landing2.svg" ></ion-img>


                <ion-row class="ion-align-items-center margin-top" >
                    <ion-col>
                        <ion-item>
                            <ion-label position="floating">Login</ion-label>
                            <ion-input v-model="login"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Mot de passe</ion-label>
                            <ion-input v-model="password"></ion-input>
                        </ion-item>
                        <br>
                        <ion-text v-if="error" class="red ion-text-center margin-top "> Login ou mot de passe incorrecte </ion-text>
                    </ion-col>

                </ion-row>
                <ion-row class="ion-align-items-center">
                    <ion-col>                    
                        <ion-button class="ion-text-center margin-top"  expand="block" shape="round" color="light"   v-on:click="auth">LOGIN</ion-button>
                    </ion-col>

                </ion-row>
                
        </ion-grid>
    </ion-page>

</template>
<script lang="js">
import {  IonHeader,IonTitle ,IonToolbar,IonPage ,IonLabel, IonInput, IonItem , IonCol, IonGrid, IonRow ,IonButton ,IonSpinner , IonText} from '@ionic/vue';

import { Plugins } from '@capacitor/core';

import axios from 'axios';

const { Storage } = Plugins;

export default {
    name: 'Login',
    components: { IonHeader,IonTitle ,IonToolbar, IonPage, IonLabel, IonInput, IonItem , IonCol, IonGrid, IonRow ,IonButton, IonSpinner , IonText} ,
    data () {
        return{
            loading : false,
            login : '',
            password : '',
            error : false
        }
    },
    methods: {
        auth : async function (){
            this.loading = true
            await axios.post('http://localhost:8081/api/employe/login',{
                login : this.login,
                password : this.password
            })
            .then( res => {
                if(res.data.login == "SUCESS"){
                    console.log(res.data.employe[0])
                    this.setStorageData(res.data.employe[0])
                }else{
                    this.error = true
                }
            })
            .catch( err => {
                console.log(err)
            })
            this.loading = false
        },

        setStorageData : async function (data) {
            await Storage.set({
                key : "employe",
                value: JSON.stringify(data)
            });
            this.$router.push('home') 

        }
        
        
    }
}

</script>
<style>
.flex_all{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.img{
    width: 175px;
    height: 175px;
}
.margin-top{
    margin-top: 25px;
}
.padding{
    padding: 10px;
}
.red{
    color: red;
}
</style>











