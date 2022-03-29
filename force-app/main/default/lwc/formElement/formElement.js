import { api, LightningElement } from 'lwc';

export default class FormElement extends LightningElement {
    @api config;

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
        let ctx = this;
        if(this.config.valeursCondition)
        return this.config.valeursCondition.map(v=>(
            { 
                label: v.libelle,
                value: v.libelle,
                key: "k-" + v.codeCondition,
                selected: v.libelle == ctx.config.value ? "selected" : ""
            }
        ))
        else return [];
    }
    onChange(e){
        this.dispatchEvent(new CustomEvent('valuechanged',{
            detail:{
                config:{...this.config,value: e.target.value}
            }
        }))
    }

}