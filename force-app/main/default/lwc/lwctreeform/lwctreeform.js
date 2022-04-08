/**
 * Created by max on 24/03/2022.
 */

import {LightningElement, api} from 'lwc';
const codeFormatPropMap={
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