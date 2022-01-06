import { LightningElement, wire, api } from 'lwc';
import getPlantRecom from '@salesforce/apex/ProjectController.getPlantRecom';
//import getCurrentStep from '@salesforce/apex/ProjectController.getCurrentStep';

export default class ProjectRecommandation extends LightningElement {

    @api recordId;
    tabsRecomm

    activeValueMessage = '';

    @wire(getPlantRecom, {projectId: '$recordId'}) plantRecom;
    //@wire(getCurrentStep, {projectId: '$recordId'}) currentStep;

    handleActive(event) {
        this.activeValueMessage = `Tab with value ${event.target.value} is now active`;
    }

}