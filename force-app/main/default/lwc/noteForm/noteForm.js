import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NOTE_OBJECT from '@salesforce/schema/Note__c';
import DATE_FIELD from '@salesforce/schema/Note__c.Date__c';
import SEVERITE_FIELD from '@salesforce/schema/Note__c.Severite__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Note__c.Description__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ETAPE_FIELD from '@salesforce/schema/Project__c.Etape_en_Cours__c';
import getProjectNoteByStepRank from '@salesforce/apex/ProjectController.getProjectNoteByStepRank';

export default class NoteForm extends LightningElement {

    @api recordId;
    @api projectId
    @api etape
    @api rank
    cardTitle = "Notes";
    noteId;
    objectApiName = NOTE_OBJECT;
    fields = [DATE_FIELD, SEVERITE_FIELD, DESCRIPTION_FIELD];

    
    get stepRank() {
        if(this.recordId != undefined) return getFieldValue(this.project.data, ETAPE_FIELD);
        return this.rank;
    }

    get noteProjectId() {
        if(this.recordId != undefined) return this.recordId;
        return this.projectId;
    }

    @wire(getRecord, { recordId: '$recordId', fields: [ETAPE_FIELD] }) project;
    @wire(getProjectNoteByStepRank, {projectId: '$noteProjectId', stepRank: '$stepRank'}) 
    getProjectNoteByStepRank({error, data}) {
        if (data) {
            this.noteId = data;
        } else {
            this.noteId = undefined;
        }
    }

    connectedCallback() {
        console.log("connectedCallback");
        console.log("connectedCallback recordId : ", this.recordId);
        console.log("connectedCallback projectId : ", this.projectId);
        console.log("connectedCallback etape : ", this.etape);

        if(this.recordId != undefined) this.cardTitle = "Current Step Notes";
    }

    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.Project__c = this.projectId; // modify a Project Id
        console.log("handleSubmit stepRank : ", this.stepRank);
        fields.Etape__c = this.etape; // modify a Note Step
        fields.Step_Rank__c = this.stepRank; // modify a Note Step Rank

        console.log("FROM Handle submit ", fields);
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