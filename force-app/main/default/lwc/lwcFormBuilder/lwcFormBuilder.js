import { LightningElement, api, track, wire } from 'lwc';
import getClientResponsList from '@salesforce/apex/ClientResponse.getClientResponsList';

export default class LwcFormBuilder extends LightningElement {

    @api formConfig;
    @api libelle;
    @api codeSuite
    uId = 1
    @api accountId = '0017Q000006Sl7GQAS';

    @track selectOptions = [];

    get uniqueId(){
        return this.uId++
    }

    @wire(getClientResponsList, {accountId: '$accountId'})
    lists({ error, data }) {
        if (data) {
            for(const opt of data){
                const option = {
                    label: opt.libelle__c,
                    value: opt.code__c,
                };
                this.selectOptions = [ ...this.selectOptions, option ];
            }
            console.log('final array =>', this.selectOptions)
        } else if (error) {
            console.error(error);
        }
    }

    onValueChanged(e){
        console.log(this.formConfig)
        this.dispatchEvent(new CustomEvent('valuechanged', {detail:{
                formConfig:this.formConfig.map(config => config.numero === e.detail.config.numero ? e.detail.config : config)
            }}))
    }

    onChange(e){
        debugger
        console.log('code suite:',e.target.value)
        this.dispatchEvent(new CustomEvent('codesuitechanged', {
            detail:{
                codeSuite:e.target.value
            }
        }))
    }
}