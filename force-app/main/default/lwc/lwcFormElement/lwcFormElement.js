import { LightningElement, api} from 'lwc';

export default class LwcFormElement extends LightningElement {
    @api jsonElement;

    get elementType() {
        if (this.jsonElement.codeFormat == 'CA') {
            return 'checkbox';
        } else if (this.jsonElement.codeFormat == 'LD') {
            return 'select';
        } else if (this.jsonElement.codeFormat == 'DA') {
            return 'date';
        } else if (this.jsonElement.codeFormat == 'MT') {
            return 'currency';
        } else if (this.jsonElement.codeFormat == 'TX') {
            return 'percent';
        } else {
            return 'text';
        }
    }

    get isCheckbox() {
        return this.elementType == 'checkbox';
    }

    get isDate() {
        return this.elementType == 'date';
    }

    get isCurrency() {
        return this.elementType == 'currency';
    }

    get isPercent() {
        return this.elementType == 'percent';
    }

    get isSelect() {
        return this.elementType == 'select';
    }
}