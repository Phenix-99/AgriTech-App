import { LightningElement } from 'lwc';

export default class ProjectFilter extends LightningElement {
    pays;
    region;
    plant;
    status;

    handleFilter() {
        console.log({pays, region, plant, status});
        this.dispatchEvent(new CustomEvent('filtered', {
            detail: {pays, region, plant, status}
        }));
    }
}