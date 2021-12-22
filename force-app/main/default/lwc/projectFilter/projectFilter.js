import { LightningElement, track } from 'lwc';

export default class ProjectFilter extends LightningElement {
    
    @track
    pays;

    @track
    region;

    @track
    plant;

    @track
    status;

    handleCountryChange(event) {
        this.pays = event.target.value;
    }

    handleRegionChange(event) {
        this.region = event.target.value;
    }

    handlePlantChange(event) {
        this.plant = event.target.value;
    }

    handleStatusChange(event) {
        this.status = event.target.checked;
    }

    handleFilter() {
        console.log({
            pays : this.pays ? this.pays : '',
            region : this.region ? this.region : '',
            plant : this.plant ? this.plant : '',
            status : this.status ? this.status : ''
        });

        this.dispatchEvent(new CustomEvent('filtered', {
            detail: {
                pays : this.pays ? this.pays : '',
                region : this.region ? this.region : '',
                plant : this.plant ? this.plant : '',
                status : this.status ? this.status : ''
            }
        }));
    }
}