/**
 * Created by max on 24/03/2022.
 */

import {api, LightningElement} from 'lwc';

export default class LwcNoeudEnfant extends LightningElement {
    @api value;
    @api level;
    @api selectedKey;
    @api checkeds;

    checked;

    connectedCallback() {
        this.checked=this.checkeds[this.value.numero]
    }

    get selectedClass(){
        return this.selectedKey===this.value.numero?'selected item' : 'item hovered'
    }

    select() {
        this.dispatchEvent(new CustomEvent("select", {
            detail: {
                key: this.value.numero,
                item: this.value,
                isChecked: this.checked,
            }
        }));
    }
    onChecked(e){
        this.checked=e.target.checked;
        this.select();
    }
}