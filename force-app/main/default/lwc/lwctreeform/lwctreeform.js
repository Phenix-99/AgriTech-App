/**
 * Created by max on 24/03/2022.
 */

import {LightningElement} from 'lwc';

export default class LwcTreeForm extends LightningElement {

  formConfig;
  libelle;

    onTreeItemSelected(e){
        this.formConfig = e.detail.item.conditions;
        this.libelle = e.detail.item.libelle;
        console.log(JSON.parse(JSON.stringify(this.formConfig)));
    }
}