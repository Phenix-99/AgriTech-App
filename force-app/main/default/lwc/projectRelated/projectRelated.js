import { LightningElement, api } from 'lwc';
import retrieveProjects from '@salesforce/apex/projectRelatedController.retrieveProjects';
//import{getSobjectValue} from'@salesforce/apex';
//import farmerName from '@salesforce/schema/Farmer__c.Name';
//import projectName from '@salesforce/schema/Project__c.Name';


export default class ProjectRelated extends LightningElement {
    projList;
    @api farmerId;

    connectedCallback(){
        retrieveProjects({cultivateurId:this.farmerId}).then(
            result=>{
                this.projList=result;
            }
        );
    }

    viewDetailProject(){

    }
}