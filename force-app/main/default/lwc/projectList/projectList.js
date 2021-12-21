import { LightningElement, wire, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getFarmerProjectsByHisName from '@salesforce/apex/ProjectController.getFarmerProjectsByHisName';

export default class ProjectList extends NavigationMixin(LightningElement) {
    @api
    farmer;

    @track
    selectedProjectId;

    @track
    projectList;
    
    error = undefined;

    @wire(getFarmerProjectsByHisName, { farmerName: '$farmer' })
    getFarmer({data, error}) {
        if (data) {
            this.projectList = data.map(project => {
                const p = {
                    Id: project.Id,
                    farmer: project.Farmer__r.Name,
                    plant: project.Plant__r.Name,
                    tel: project.Farmer__r.Phone__c,
                    step: project.Notes__r ? project.Notes__r[0].Etape__c : '',
                    severity: project.Notes__r ? project.Notes__r[0].Severite__c : '',
                    country: project.Pays__c,
                    region: project.Region__c,
                    status: project.Status__c
                }
                return p;
            })
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }

    handleRowClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.recordId,
                actionName: "view"
            },
        });
    }
}