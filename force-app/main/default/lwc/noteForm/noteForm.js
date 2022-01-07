import { LightningElement, api, wire } from 'lwc';
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

export default class NoteForm extends LightningElement {

    @api recordId;
    @api etape
    @api rank
    noteId;
    step;
    recommandation;
    ready = false;
    objectApiName = NOTE_OBJECT;
    fields = [DATE_FIELD, SEVERITE_FIELD, DESCRIPTION_FIELD];

    
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
        console.log("etape: " + this.etape + ", rank " + this.rank);
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
            console.log("recommandationByRank : ", data);
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
            console.log("getProjectNoteByStepRank : ", data);
            this.noteId = data;
        } else if (error) {
            console.log(error);
        }
    }

    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        
        console.log("handleSubmit projectId : ", this.projectId);
        console.log("handleSubmit noteId : ", this.noteId);
        console.log("handleSubmit step : ", this.step);
        console.log("handleSubmit stepRank : ", this.stepRank);
        const fields = event.detail.fields;
        fields.Project__c = this.projectId; // modify a Project Id
        fields.Etape__c = this.step; // modify a Note Step
        fields.Step_Rank__c = this.stepRank; // modify a Note Step Rank

        console.log("FROM Handle submit ", JSON.stringify(fields));
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Note created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    
}