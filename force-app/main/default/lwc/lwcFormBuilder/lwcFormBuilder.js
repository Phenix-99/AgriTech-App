import { LightningElement } from 'lwc';
import form from '@salesforce/resourceUrl/form';

export default class LwcFormBuilder extends LightningElement {
    jsonForm;
    connectedCallback() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", form);
        xhr.onload = () =>console.log (this.jsonForm = JSON.parse(xhr.responseText));
        xhr.send(null);
    }

    isCheckbox(codeFormat){
        return codeFormat == 'CA';
    }
}