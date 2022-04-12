import { LightningElement,api,wire,track } from 'lwc';
import getProjectProfil from '@salesforce/apex/ProjectController.getProjectProfil';

export default class ProjectProfile extends LightningElement {

    @api recordId;
    @track profil;
    @track profil_severité;


    @wire(getProjectProfil, {projectId: '$recordId'})
    getprofil({data,error}){
        if(data){
            console.log(data);
            this.profil = data[0];
            this.profil_severité = this.profil.Notes__r ? this.profil.Notes__r[0].Severite__c : '';
        }else if(error){
            console.log(error);
        }
    }

}