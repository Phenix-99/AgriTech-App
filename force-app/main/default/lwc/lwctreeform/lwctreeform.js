/**
 * Created by max on 24/03/2022.
 */

import {LightningElement, api, track, wire} from 'lwc';

import getClientResponsList from '@salesforce/apex/ClientResponse.getClientResponsList';

const codeFormatPropMap = {
  "MT":"montant",
  "DA":"date",
  "??":"texte",
  "TX":"taux",
  "LD":"code",
  "CA":"??",
}

export default class LwcTreeForm extends LightningElement {

  data = {}
  selectedItem
  
  @api result
  @api accountId = '0017Q000006Sl7GQAS';
  @track selectOptions = [];
  

  @wire(getClientResponsList, {accountId: '$accountId'})
    lists({ error, data }) {
        if (data) {
            for(const opt of data){
                const option = {
                    label: opt.libelle__c,
                    value: opt.code__c,
                };
                this.selectOptions = [ ...this.selectOptions, option ];
            }
        } else if (error) {
            console.error(error);
        }
    }

  get formConfig() {
    return this.data[this.selectedItem?.numero]?.conditions
  }

  get codeSuite() {
    return this.data[this.selectedItem?.numero]?.codeSuiteDonneeOrigine
  }


  get libelle() {
    return this.selectedItem.libelle
  }

  formIsDisabled;

  onTreeItemSelected(e) {
    this.selectedItem = e.detail.item
    console.log('selectedItem', this.selectedItem);
    this.data = {
      ...this.data,
      [this.selectedItem.numero]: {
        ...e.detail.item,
        ...this.data[this.selectedItem.numero],
        active: e.detail.isChecked
      }
    }
    this.formIsDisabled = !e.detail.isChecked
  }

onValueChanged(e) {
    this.data = {
      ...this.data,
      [this.selectedItem.numero]: {
        ...this.data[this.selectedItem.numero],
        conditions: e.detail.formConfig ? e.detail.formConfig : []
      }
    }
    console.log('data', JSON.parse(JSON.stringify(this.data)));
    this.setResult()
  }


onCodeSuiteChanged(e) {
    this.data = {
      ...this.data,
      [this.selectedItem.numero]: {
        ...this.data[this.selectedItem.numero],
        codeSuiteDonneeOrigine: e.detail.codeSuite
      }
    }
    console.log('data', JSON.parse(JSON.stringify(this.data)));
    this.setResult()
  }

  onChange(e){
    debugger
    console.log('code suite:',e.target.value)
    this.dispatchEvent(new CustomEvent('codesuitechanged', {
        detail:{
            codeSuite:e.target.value
        }
    }))
  }

  setResult() {
    this.result = Object.keys(this.data)
        .filter(numero => this.data[numero].active)
        .map((numero, index) => {
          const data = this.data[numero]
          return {
            "noResultat": index, // increment
            "codeCategorieResultat": data.codeResultat,// "P",//codeResultat
            "noPersonneConcernee": null,//"12345672", //?
            "indCouple": false,
            "codeSuiteDonneeOrigine": data.codeSuiteDonneeOrigine,
            "dateSuppression": null,
            "noTypeResultat": numero,// 1100000,//numero
            "conditions": data.conditions?.filter(cond=> cond.value).map(cond => {
              return {
                "numeroTypeCondition": cond.numero,//45,//conditions.numero
                [codeFormatPropMap[cond.codeFormat]]: cond.value
                // "montant": 1000.5,// Valeur renseignée si Type = Montant
                // "date": "00010101",// Valeur renseignée si Type = date, format aaaammdd
                // "texte": "TEST texte",// Valeur renseignée si Type = booleen, "O"/"N" (oui / Non)
                // "taux": 10.0,// Valeur renseignée si Type = taux
                // "code": "BB" // Valeur renseignée si Type = Liste déroulante
              }
            }),
            "noContratSouscrit": null,
            "noTypeCloture": "0"
          }
        })

    console.debug('result',JSON.parse(JSON.stringify(this.result)))
  }
}