/**
 * Created by max on 24/03/2022.
 */

import {LightningElement} from 'lwc';

export default class LwcTreeForm extends LightningElement {

  formConfig;
  libelle;


  formChange(e) {
    e.preventDefault();
    console.clear();
    console.log(e, "Inside formChange");
    const formData = new FormData(e.target);
    
    console.log('Output of formData : ');
    console.log(formData);

    console.log('Output of Object.fromEntries(formData) : ');
    console.log(JSON.stringify(Object.fromEntries(formData)));
  }
  
  onTreeItemSelected(e){
      this.formConfig = e.detail.item.conditions;
      this.libelle = e.detail.item.libelle;
      console.log(JSON.parse(JSON.stringify(this.formConfig)));
  }

    

}