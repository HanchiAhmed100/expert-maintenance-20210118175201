<template>
    <ion-page >
        <ion-grid class="flex_all">
                <ion-spinner class="flex_all" name="circles" v-if="loading"></ion-spinner>

                <ion-row class="ion-align-items-center" v-if="!loading" >
                    <ion-col>
                        <ion-item>
                            <ion-label position="floating">Login</ion-label>
                            <ion-input v-model="login"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Mot de passe</ion-label>
                            <ion-input v-model="password"></ion-input>
                        </ion-item>
                    </ion-col>

                </ion-row>
                <ion-row class="ion-align-items-center" v-if="!loading">
                    <ion-col>                    
                        <ion-button class="ion-text-center"  expand="block" shape="round" color="light" v-on:click="auth">LOGIN</ion-button>
                    </ion-col>

                    <ion-text v-if="error"> Login ou mot de passe incorrecte </ion-text>
                </ion-row>
                
        </ion-grid>
    </ion-page>

</template>
<script lang="js">
import { IonPage ,IonLabel, IonInput, IonItem , IonCol, IonGrid, IonRow ,IonButton ,IonSpinner , IonText} from '@ionic/vue';

import { Plugins } from '@capacitor/core';

import axios from 'axios';

const { Storage } = Plugins;

export default {
    name: 'Login',
    components: {  IonPage, IonLabel, IonInput, IonItem , IonCol, IonGrid, IonRow ,IonButton, IonSpinner , IonText} ,
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
            await axios.post('https://maintenance-expert.herokuapp.com/api/employe/login',{
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
</style>











