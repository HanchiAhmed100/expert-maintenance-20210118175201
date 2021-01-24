<template>
<ion-content>
  <ion-page>
        <ion-header>  
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button v-on:click="goback()"></ion-back-button>
                </ion-buttons>
                
                <ion-title>Detail Interventions</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item v-if="!intervention.terminee">
                <ion-label>Terminer :</ion-label>
                <ion-toggle @ionChange="changeToggle" v-model="toggel" value="Terminer"></ion-toggle>
            </ion-item>
            <ion-item v-else>
                <ion-label>Terminer :</ion-label>
                <ion-toggle value="Terminer" disabled="true" checked></ion-toggle>
            </ion-item>
            
            <ion-card>
                <ion-card-header>
                    <ion-card-title style="float: left">{{intervention.titre}}</ion-card-title>
                    <ion-card-subtitle style="float: right ; color:red">Priorite : {{priorite.nom}}</ion-card-subtitle>

                </ion-card-header>
                <br>
                <ion-card-content>
                    <ion-text>Planification :</ion-text>
                    <div>Date Debut : {{ formateDate(intervention.dateplanification)}}</div>
                    <div>Date Fin Plannifer : {{ formateDate(intervention.dateterminaison)}}</div>
                    <div>Heure Debut  : {{ intervention.heuredebutplan}}</div>
                    <div>Heure Fin: {{ intervention.heurefinplan}}</div>
                </ion-card-content>
            </ion-card>
          <ion-card>
                <ion-card-header>
                    <ion-card-title style="float: left">Liste des taches : </ion-card-title>
                </ion-card-header>
                    <br>

                <ion-card-content v-for="tache in taches" :key="tache.id">
                    <div>Referance : {{ tache.refernce }}</div>
                    <div>Nom Tache : {{ tache.nom }}</div>
                    <div>Date Action  : {{  formateDate(tache.dateaction) }} heure </div>
                    <div>Duree : {{ tache.duree }}</div>
                </ion-card-content>
            </ion-card>


            <ion-card v-if="intervention.terminee">
                <ion-card-header>
                    <ion-card-title style="float: left">Terminer Le :</ion-card-title>
                </ion-card-header>
                    <br>

                <ion-card-content>
                    <div>Date Debut : {{ formateDate(intervention.datedebut)}}</div>
                    <div>Date Fin : {{ formateDate(intervention.datefin) }}</div>
                    <div>Heure Debut  : {{ intervention.heuredebuteffect}}</div>
                    <div>Heure Fin: {{ intervention.heurefineffect}}</div>
                </ion-card-content>
            </ion-card>


            <ion-card>
                <ion-card-header>
                    <ion-card-title >Client : {{client.nom}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <div>Adresse : {{ client.adresse }}</div>
                    <div>Telephone : {{ client.tel }}</div>
                    <div>Email  : {{ client.email}}</div>
                </ion-card-content>
            </ion-card>
            <ion-card>
                <ion-card-header>
                    <ion-card-title >Site : {{site.adresse}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <div>Longitude : {{ site.longitude }}</div>
                    <div>Latitude : {{ site.latitude }}</div>
                    <div>rue  : {{ site.rue}}</div>
                    <div>code postale : {{ site.codepostal}}</div>
                    <div>Ville: {{ site.ville}}</div>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</ion-content>
</template>

<script>
import { IonBackButton,IonPage,IonToolbar,IonTitle ,IonButtons,IonHeader ,IonText , IonLabel  ,IonToggle , IonCard , IonItem ,IonCardHeader ,IonCardSubtitle , IonCardTitle ,IonCardContent} from '@ionic/vue';
import { Plugins } from '@capacitor/core';
import axios from 'axios';
const { Storage } = Plugins;
import moment from 'moment';

export default {
    name : 'Infromations',
    components: { IonBackButton,IonPage ,IonToolbar,IonHeader,IonTitle,IonButtons ,IonText, IonLabel ,IonToggle , IonCard , IonItem,IonCardHeader ,IonCardSubtitle, IonCardTitle,IonCardContent},
    data(){
        return{
            id : '',
            loading : false,
            employe : [],
            intervention : [],
            priorite : [],
            site : [],
            client : [],
            toggel : false,
            taches : []
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
            await axios.get(`https://maintenance-expert.herokuapp.com/api/intervention/${this.id}`)
            .then( res =>{
                console.log(res.data)
                this.intervention = res.data
                this.site = res.data.site
                this.priorite = res.data.priorite
                this.taches = res.data.taches
                this.loadClient(this.site.clientId)
            })
            .catch(err => {
                console.log(err)
            })
        },
        loadClient : async function (id) {
            await axios.get(`https://maintenance-expert.herokuapp.com/api/client/${id}`)
            .then( res =>{
                console.log(res.data)
                this.client = res.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        changeToggle : function (){
            console.log("toggel")
            this.toggel = !this.toggel
            if(this.toggel){
                this.$router.push({ name : 'AddInterventionInfo' ,params :{id : this.id} }) 

            }
            console.log(this.toggel)
        },
        goback : function () {
            this.$router.push('Home') 
        }
    }
}
</script>

<style>

</style>