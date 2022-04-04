import { api, LightningElement } from 'lwc';

export default class FormElement extends LightningElement {
    @api config;

    get required() {
        return this.config.obligatoire;
    }

    get isCheckbox() {
        return this.config.codeFormat === 'CA';
    }

    get isList() {
        return this.config.codeFormat === 'LD';
    }

    get isInputTypeNumber() {
        return this.config.codeFormat === 'MT';
    }

    get isDate() {
        return this.config.codeFormat === 'DA';
    }

    get isSeparator() {
        return this.config.codeFormat === 'SP';
    }

    get isTaux() {
        return this.config.codeFormat === 'TX';
    }
    get selectOptions(){
        return this.config.valeursCondition.map(v=>({label: v.libelle, value: v.libelle}))
    }
    onChange(e){
        this.dispatchEvent(new CustomEvent('valuechanged',{
            detail:{
                config:{...this.config,value: e.target.value}
            }
        }))
    }

}