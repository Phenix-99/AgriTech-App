import { LightningElement, api } from 'lwc';

export default class ProjectHome extends LightningElement {

    farmerName;

    getFarmerName(evt) {
        this.farmerName = evt.detail.farmerName;
    }
}