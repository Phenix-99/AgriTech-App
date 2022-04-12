import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NOTE_OBJECT from '@salesforce/schema/Note__c';
import DATE_FIELD from '@salesforce/schema/Note__c.Date__c';
import SEVERITE_FIELD from '@salesforce/schema/Note__c.Severite__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Note__c.Description__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ETAPE_FIELD from '@salesforce/schema/Project__c.Etape_en_Cours__c';
import PLANT_FIELD from '@salesforce/schema/Project__c.Plant__c';
import getProjectNoteByStepRank from '@salesforce/apex/ProjectController.getProjectNoteByStepRank';
import getRecommandationByRank from '@salesforce/apex/ProjectController.getRecommandationByRank';
import { publish, MessageContext } from 'lightning/messageService';
import agrixMessageChannel from '@salesforce/messageChannel/agrixMessageChannel__c';

export default class NoteForm extends LightningElement {

    @api recordId;
    @api etape
    @api rank
    @track noteId;
    step;
    recommandation;
    ready = false;
    objectApiName = NOTE_OBJECT;
    fields = [DATE_FIELD, SEVERITE_FIELD, DESCRIPTION_FIELD];

    @wire(MessageContext)
    messageContext;

    renderedCallback() {
        const data = {
            step: this.etape,
            rank: this.rank
        }

        publish(this.messageContext, agrixMessageChannel, data);
    }
    
    get stepRank() {
        //console.log("get stepRank() (getFieldValue) : ", getFieldValue(this.project.data, ETAPE_FIELD));
        if(this.rank == undefined) return getFieldValue(this.project.data, ETAPE_FIELD);
        return this.rank;
    }

    get plantId() {
        //console.log("get plantId() (getFieldValue) : ", getFieldValue(this.project.data, PLANT_FIELD));
        return getFieldValue(this.project.data, PLANT_FIELD);
    }

    get cardTitle() {
        //console.log("etape: " + this.etape + ", rank " + this.rank);
        if(!(this.etape && this.rank)) return "Notes - "+this.step;
        return "Notes";
    }

    get projectId() {
        return this.recordId;
    }

    @wire(getRecord, { recordId: '$recordId', fields: [ETAPE_FIELD, PLANT_FIELD] }) project;
    @wire(getRecommandationByRank, {stepRank: '$stepRank', plantId: '$plantId'})
    recommandationByRank({data, error}) {
        if (data) {
            //console.log("recommandationByRank : ", data);
            this.recommandation = data;
            this.step = data.Etape__c;
        } else if (error) {
            console.log(error);
            this.step = this.etape
        }
    }

    @wire(getProjectNoteByStepRank, {projectId: '$projectId', stepRank: '$stepRank'})
    getProjectNoteByStepRank({data, error}) {
        if (data) {
            //console.log("getProjectNoteByStepRank : ", data);
            this.noteId = data;
        } else if (error) {
            console.log(error);
        }
    }

}