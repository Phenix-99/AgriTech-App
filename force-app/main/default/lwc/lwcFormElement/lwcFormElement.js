import { LightningElement, api} from 'lwc';

export default class LwcFormElement extends LightningElement {
    @api jsonElement;

    get elementType() {
        if (this.jsonElement.codeFormat == 'CA') {
            return 'checkbox';
        } else if (this.jsonElement.codeFormat == 'LD') {
            return 'select';
        } else {
            return 'text';
        }
    }

    get isCheckbox() {
        return this.elementType == 'checkbox';
    }

    get isSelect() {
        return this.elementType == 'select';
    }
}