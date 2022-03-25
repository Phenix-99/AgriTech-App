/**
 * Created by max on 24/03/2022.
 */

import {api, LightningElement} from 'lwc';

export default class LwcNoeudEnfant extends LightningElement {
    @api value;
    @api level;
    @api selectedKey;

    get selectedClass(){
        return this.selectedKey === this.value.numero ? 'selected item' : 'hovered item'
    }
    select() {
        this.dispatchEvent(new CustomEvent("select", {
            detail: {
                key: this.value.numero,
                item: this.value
            }
        }));
    }
}