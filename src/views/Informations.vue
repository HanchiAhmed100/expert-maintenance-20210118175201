<template>
  <ion-page>
        <ion-header>  
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button auto-hide="false"></ion-menu-button>
                </ion-buttons>
                <ion-title>Detail Interventions</ion-title>
            </ion-toolbar>
        </ion-header>
            <ion-card>
                <ion-card-header>
                    <ion-card-title style="float: left">{{intervention.titre}}</ion-card-title>
                    <ion-card-subtitle style="float: right ; color:red">Priorite : {{priorite.nom}}</ion-card-subtitle>

                </ion-card-header>
                <br>
                <ion-card-content>
                    <ion-text>Planification</ion-text>
                    <div>Date Debut : {{ formateDate(intervention.dateplanification)}}</div>
                    <div>Date Fin Plannifer : {{ formateDate(intervention.dateterminaison)}}</div>
                    <div>Heure Debut  : {{ intervention.heuredebutplan}}</div>
                    <div>Heure Fin: {{ intervention.heurefinplan}}</div>
                </ion-card-content>
            </ion-card>
            <ion-card>
                <ion-card-header>
                    <ion-card-title style="float: left">Site : {{site.adresse}}</ion-card-title>
                </ion-card-header>
                <br>
                <ion-card-content>
                    <ion-text>Details</ion-text>
                    <div>Longitude : {{ site.longitude }}</div>
                    <div>Latitude : {{ site.latitude }}</div>
                    <div>rue  : {{ site.rue}}</div>
                    <div>code postale : {{ site.codepostal}}</div>
                    <div>Ville: {{ site.ville}}</div>

                </ion-card-content>
            </ion-card>

        

    </ion-page>
</template>

<script>
import {IonMenuButton, IonPage,IonToolbar,IonTitle ,IonButtons,IonHeader ,IonText} from '@ionic/vue';
import { Plugins } from '@capacitor/core';
import axios from 'axios';
const { Storage } = Plugins;
import moment from 'moment';

export default {
    name : 'Infromations',
    components: {IonMenuButton, IonPage ,IonToolbar,IonHeader,IonTitle,IonButtons ,IonText},
    data(){
        return{
            id : '',
            loading : false,
            employe : [],
            intervention : [],
            priorite : [],
            site : []
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
        this.loadIntervention(this.id)
      
    },
    methods : {
        formateDate : function(date){
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        loadIntervention : async function () {
            console.log(this.id)
            await axios.get(`http://localhost:8081/api/intervention/${this.id}`)
            .then( res =>{
                console.log(res.data)
                this.intervention = res.data
                this.site = res.data.site
                this.priorite = res.data.priorite
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>