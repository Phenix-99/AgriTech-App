import { api, LightningElement } from 'lwc';

export default class FormElement extends LightningElement {

    @api value;
    @api isActive;

    get libelle() {
        return this.value.libelle.trim();
    }

    get isCheckbox() {
        return this.value.codeFormat === 'CA';
    }

    get isList() {
        return this.value.codeFormat === 'LD';
    }

    get isMontant() {
        return this.value.codeFormat === 'MT';
    }

    get isDate() {
        return this.value.codeFormat === 'DA';
    }

    get isSeparator() {
        return this.value.codeFormat === 'SP';
    }

    get isTaux() {
        return this.value.codeFormat === 'TX';
    }
}