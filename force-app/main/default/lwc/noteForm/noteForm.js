import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NOTE_OBJECT from '@salesforce/schema/Note__c';
import DATE_FIELD from '@salesforce/schema/Note__c.Date__c';
import ETAPE_FIELD from '@salesforce/schema/Note__c.Etape__c';
import PROJECT_FIELD from '@salesforce/schema/Note__c.Project__c';
import SEVERITE_FIELD from '@salesforce/schema/Note__c.Severite__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Note__c.Description__c';

export default class NoteForm extends LightningElement {

    @api projectId
    @api etape
    objectApiName = NOTE_OBJECT;
    fields = [DATE_FIELD, ETAPE_FIELD, PROJECT_FIELD, SEVERITE_FIELD, DESCRIPTION_FIELD];

    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.Project__c = projectId; // modify a Project Id
        fields.Etape__c = etape; // modify a Project Id
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