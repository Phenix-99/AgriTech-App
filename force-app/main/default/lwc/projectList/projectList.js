import { LightningElement, wire, api, track } from 'lwc';
import getFarmerProjectsByHisName from '@salesforce/apex/ProjectController.getFarmerProjectsByHisName';

const columns = [ 
    { label: 'Nom cultivateur', fieldName: 'farmer' },
    { label: 'Plante cultivée', fieldName: 'plant' },
    { label: 'Whatsapp/Téléphone', fieldName: 'tel' },
    { label: 'Etape', fieldName: 'step' },
    { label: 'Sévérité', fieldName: 'severity' },
    { label: 'Pays', fieldName: 'country' },
    { label: 'Region', fieldName: 'region' },
    { label: 'Status', fieldName: 'status' }
];

export default class ProjectList extends LightningElement {
    @api
    farmer;

    columns = columns;

    @track
    projectList;
    
    error = undefined;

    @wire(getFarmerProjectsByHisName, { farmerName: '$farmer' })
    getFarmer({data, error}) {
        if (data) {
            console.log(data)
            this.projectList = data.map(function (project) {
                const p = {
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
}