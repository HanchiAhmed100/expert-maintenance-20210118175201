<template>
    <ion-page>
        <ion-header>  
            <!-- <ion-toolbar>
                <ion-buttons>
                    <ion-button>
                        <ion-icon
                            name="apps-outline"
                            style="font-size: 24px; color: black"
                        />
                    </ion-button>
                </ion-buttons>
                <ion-title class="">Interventions</ion-title>
            </ion-toolbar> -->
            
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button auto-hide="false"></ion-menu-button>
                </ion-buttons>
                <ion-title>Interventions</ion-title>
            </ion-toolbar>
        </ion-header>




        <ion-grid>
            <ion-row class="ion-align-items-center">
                <ion-text>Home</ion-text>
            </ion-row>
        </ion-grid>
        

    </ion-page>
</template>

<script>
import { IonMenuButton, IonPage,IonToolbar,IonTitle ,IonButtons,IonHeader, IonText} from '@ionic/vue';
import { appsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { Plugins } from '@capacitor/core';


const { Storage } = Plugins;

export default {
    name: 'Login',
    components: { IonMenuButton, IonPage ,IonText,IonToolbar,IonHeader,IonTitle,IonButtons},
    data () {
        return {
            id : '',
            employe : []
        }
    },
    created(){
        addIcons({
        'apps-outline': appsOutline,

        });
    },
    async mounted(){
        console.log("hnee")
        const ret =  await Storage.get({ key: 'employe' });
        const user = ret.value;
        // if(!user){

        // }
        console.log(JSON.parse(user))
        
    },
    methods : {

    },
}
</script>

<style>

</style>