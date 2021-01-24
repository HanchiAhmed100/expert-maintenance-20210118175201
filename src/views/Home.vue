<template>
    <ion-page>
        <ion-header>  
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button auto-hide="false"></ion-menu-button>
                </ion-buttons>
                <ion-title>Interventions</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-grid>
            
            <ion-row class="ion-align-items-center">
                <ion-list>  
                    <ion-item v-for="i in interventions.interventions" :key="i.id" v-on:click="goToInformation(i.id)">
                        <ion-label class="mytext">Titre : {{i.titre}} <br>Date Debut Plannifier : {{ formateDate(i.dateplanification) }}<br> Date Fin Plannifier : {{ formateDate(i.dateterminaison) }} </ion-label>
                        <!-- <ion-checkbox color="secondary"  slot="end"></ion-checkbox> -->
                    </ion-item>
                </ion-list>
            </ion-row>
        </ion-grid>
        

    </ion-page>
</template>

<script>
import { IonMenuButton,IonGrid,IonRow, IonPage,IonToolbar,IonTitle ,IonButtons,IonHeader, IonList ,IonItem ,IonLabel } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
import axios from 'axios';
const { Storage } = Plugins;
import moment from 'moment';


export default {
    name: 'Login',
    components: { IonGrid,IonRow, IonMenuButton, IonPage ,IonToolbar,IonHeader,IonTitle,IonButtons,IonList ,IonItem,IonLabel },
    data () {
        return {
            id : '',
            employe : [],
            interventions : []
        }
    },
    async mounted(){
        console.log("hnee")
        const ret =  await Storage.get({ key: 'employe' });
        const user = ret.value;
        if(!user){
            this.$router.push('Login') 
        }
        this.employe = JSON.parse(user) 
        console.log(JSON.parse(user))
        this.loadInterventions()
      
    },
    methods : {
        loadInterventions : async function(){
            await axios.get(`https://maintenance-expert.herokuapp.com/api/employe/interventions/${this.employe.id}`)
            .then(res => { 
                console.log(res)
                this.interventions = res.data
            })
            .catch(err => { console.log(err)})
        },
        formateDate : function(date){
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        goToInformation : function(id){
            console.log(id)
            this.$router.push({ name : 'Informations' , params : {id : id}}) 
        }
    },
}
</script>

<style>
.mytext{
    padding: 5px;
    line-height: 25px;
    color: #000;
}
</style>