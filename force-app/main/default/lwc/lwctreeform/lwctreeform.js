/**
 * Created by max on 24/03/2022.
 */

import {LightningElement} from 'lwc';

export default class LwcTreeForm extends LightningElement {

  data = {}
  selectedItem

  get formConfig() {
    return this.data[this.selectedItem?.numero]?.conditions
  }


  get libelle() {
    return this.selectedItem.libelle
  }

  formIsDisabled;

  onTreeItemSelected(e) {
    this.selectedItem = e.detail.item
    this.data = {
      ...this.data,
      [this.selectedItem.numero]: {...e.detail.item, ...this.data[this.selectedItem.numero]}
    }
    this.formIsDisabled = !e.detail.isChecked
  }

  onValueChanged(e) {
    this.data = {
      ...this.data,
      [this.selectedItem.numero]: {
        ...this.data[this.selectedItem.numero],
        conditions: e.detail.formConfig
      }
    }
    console.log('data',JSON.parse(JSON.stringify(this.data)));

  }

}