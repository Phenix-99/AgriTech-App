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
import getStepByRank from '@salesforce/apex/ProjectController.getStepByRank';

export default class NoteForm extends LightningElement {

    @api recordId;
    @api etape
    @api rank
    noteId;
    objectApiName = NOTE_OBJECT;
    fields = [DATE_FIELD, SEVERITE_FIELD, DESCRIPTION_FIELD];

    
    get stepRank() {
        console.log("get stepRank() (getFieldValue) : ", getFieldValue(this.project.data, ETAPE_FIELD));
        if(this.rank == undefined) return getFieldValue(this.project.data, ETAPE_FIELD);
        return this.rank;
    }

    get plantId() {
        console.log("get plantId() (getFieldValue) : ", getFieldValue(this.project.data, PLANT_FIELD));
        return getFieldValue(this.project.data, PLANT_FIELD);
    }

    get cardTitle() {
        if(this.etape == undefined && this.rank == undefined) return "Notes - "+this.step;
        return "Notes";
    }

    get projectId() {
        return this.recordId;
    }

    get step() {
        console.log("get step() (stepByRank) : ", this.stepByRank.data);
        if(this.etape == undefined) return this.stepByRank.data;
        return this.etape;
    }

    @wire(getRecord, { recordId: '$recordId', fields: [ETAPE_FIELD, PLANT_FIELD] }) project;
    @wire(getStepByRank, {stepRank: '$stepRank', plantId: '$plantId'}) stepByRank;
    @wire(getProjectNoteByStepRank, {projectId: '$projectId', stepRank: '$stepRank'})
    getProjectNoteByStepRank({error, data}) {
        if (data) {
            console.log("getProjectNoteByStepRank : ", data);
            this.noteId = data;
        } else {
            this.noteId = undefined;
        }
    }

    connectedCallback() {
        console.log("connectedCallback");
        console.log("connectedCallback recordId : ", this.recordId);
        console.log("connectedCallback noteId : ", this.noteId);
        console.log("connectedCallback projectId : ", this.projectId);
        console.log("connectedCallback step : ", this.step);
        console.log("connectedCallback stepRank : ", this.stepRank);

        
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
            title: 'Operation success !',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    
}