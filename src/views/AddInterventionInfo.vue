<template>
  <ion-page>
      <ion-content>

        <ion-header>  
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button v-on:click="goback()"></ion-back-button>
                </ion-buttons>
                <ion-title>Edit Intervention</ion-title>
            </ion-toolbar>
        </ion-header>


        <ion-content>
     

            <ion-item>
                <ion-label position="floating">Date Debut d'intervention</ion-label>
                <ion-datetime display-format="DD/MM/YYYY" v-model="datedebut" min="2021-01-01" max="2029-12-31" ></ion-datetime>
            </ion-item>

            <ion-item>
                <ion-label position="floating">Date Fin d'intervention</ion-label>
                <ion-datetime display-format="DD/MM/YYYY" min="2021-01-01" max="2029-12-31" v-model="datefin"></ion-datetime>
            </ion-item>


            <ion-item>
                <ion-label>Heure debut</ion-label>
                <ion-datetime display-format="HH:mm" v-model="heuredebuteffect"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label>Heure fin</ion-label>
                <ion-datetime display-format="HH:mm" v-model="heurefineffect"></ion-datetime>
            </ion-item>

              <ion-button expand="block" color="dark" v-on:click="UpdateIntervention()">Valider Intervention</ion-button>

        </ion-content>



        
</ion-content>

    </ion-page>
</template>

<script>
import {IonBackButton,IonPage ,IonHeader,IonToolbar ,IonButtons , IonTitle ,IonDatetime } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import moment from 'moment';
import axios from 'axios';


export default {
    name : 'AddInterventionInfo',
    components: {IonBackButton,IonPage ,IonHeader,IonToolbar ,IonButtons , IonTitle ,IonDatetime},
    data(){
        return{
            id : '',
            datedebut : "",
            datefin : '',
            heuredebuteffect: '',
            heurefineffect : ''
        }
    },
    async mounted(){
        
        const ret =  await Storage.get({ key: 'employe' });
        const user = ret.value;
        if(!user){
            this.$router.push('Login') 
        }
        this.employe = JSON.parse(user) 
        this.id = this.$route.params.id

        console.log(JSON.parse(user))
      
    },
    methods : {
        formateDate : function(date){
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        formateTime : function(date){
            return moment(date).format("HH:mm:ss") 
        },
        UpdateIntervention : async function(){
            this.heuredebuteffect = this.formateTime(this.heuredebuteffect)
            this.heurefineffect = this.formateTime(this.heurefineffect)
            await axios.put(`https://maintenance-expert.herokuapp.com/api/intervention/${this.id}`,{
                datedebut : this.datedebut,
                datefin : this.datefin,
                heuredebuteffect : this.heuredebuteffect ,
                heurefineffect : this.heurefineffect,
                terminee : true
            }).then(res => {
                console.log(res)
                this.$router.push({ name : 'Informations' , params : {id : this.id}}) 

            }).catch(err => {
                console.log(err)
            })
        },
        goback : async function(){
            this.$router.push({ name : 'Informations' , params : {id : this.id}}) 
        }
    }
}
</script>

<style>

</style>