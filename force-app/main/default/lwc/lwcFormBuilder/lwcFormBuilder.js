import { LightningElement } from 'lwc';
import form from '@salesforce/resourceUrl/form';

export default class LwcFormBuilder extends LightningElement {

    result;

    connectedCallback() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", form);
        xhr.onload = () => this.result = JSON.parse(xhr.responseText);
        xhr.send(null);
    }
}