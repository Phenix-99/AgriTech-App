import { api, LightningElement } from 'lwc';

export default class FormElement extends LightningElement {
    @api value;

    get libelle() {
        return this.value.libelle.trim();
    }

    get isCheckbox() {
        return this.value.codeFormat === 'CA' ? true : false;
    }

    get isList() {
        return this.value.codeFormat === 'LD' ? true : false;
    }

    get isInputTypeNumber() {
        return this.value.codeFormat === 'MT' ? true : false;
    }

    get isDate() {
        return this.value.codeFormat === 'DA' ? true : false;
    }

    get isSeparator() {
        return this.value.codeFormat === 'SP' ? true : false;
    }

    get isTaux() {
        return this.value.codeFormat === 'TX' ? true : false;
    }
}