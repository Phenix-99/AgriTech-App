/**
 * Created by max on 24/03/2022.
 */

import {LightningElement,track} from 'lwc';

export default class LwcTreeForm extends LightningElement {

  @track formConfig;

    onTreeItemSelected(e){
        this.formConfig = e.detail.item.conditions
        console.log(JSON.parse(JSON.stringify(this.formConfig)))
    }
}