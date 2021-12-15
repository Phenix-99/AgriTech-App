import { LightningElement, api } from 'lwc';

const columns = [ 
    { label: 'Nom cultivateur', fieldName: '' },
    { label: 'Plante cultivée', fieldName: '' },
    { label: 'Whatsapp/Téléphone', fieldName: '' },
    { label: 'Etape', fieldName: '' },
    { label: 'Sévérité', fieldName: '' },
    { label: 'Pays', fieldName: '' },
    { label: 'Region', fieldName: '' },
    { label: 'Status', fieldName: '' }
];

export default class ProjectList extends LightningElement {
    @api
    farmerName;

    farmerSelected(event) {

    }
}