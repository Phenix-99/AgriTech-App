import { LightningElement, api, track, wire } from 'lwc';
import retrieveProjects from '@salesforce/apex/ProjectController.retrieveProjects';
//import {CurrentPageReference} from 'lightning/navigation';
//import {registerListener,unregisterAllListeners,fireEvent} from 'c/pubsub';
import { NavigationMixin } from 'lightning/navigation';

export default class ProjectRelated extends NavigationMixin(LightningElement) {
    projList;
    @api farmerId;
    //@track projId;
    @api projIdExist;
    //@wire(CurrentPageReference) pageRef;

    connectedCallback(){
        if(this.farmerId && this.projIdExist){
            retrieveProjects({cultivateurId:this.farmerId, projIdLoad:this.projIdExist}).then(
                result=>{ 
                    this.projList=result;
                }
            );
        }
    }


    sendProjectId(event){
        //this.projId=event.target.dataset.recordid;
        //fireEvent(this.pageRef,'projId', this.projId);
        console.log('FROM ', event.target.dataset);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.recordid,
                actionName: "view"
            },
        });
    }
   

    
}