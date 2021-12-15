import { LightningElement } from 'lwc';

export default class Search extends LightningElement {

    farmerNameChange(event) {
        this.dispatchEvent(new CustomEvent('namechange', {
            detail: { farmerName: event.target.value }
        }));
    }
}