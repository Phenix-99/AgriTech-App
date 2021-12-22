import { LightningElement, api } from 'lwc';

export default class ProjectHome extends LightningElement {

    farmerName;
    filterValues;

    getFarmerName(evt) {
        this.farmerName = evt.detail.farmerName;
    }

    getFilterValues(evt) {
        this.filterValues = evt.detail;
    }

    
}