import { LightningElement, api,track} from 'lwc';
import apiresult from '@salesforce/resourceUrl/apiresult';

export default class Lwc07creDailySouscription extends LightningElement {
    
    @api title
    apiresult
    @track listelts = [];
    jsonResult;

    connectedCallback() {
       this.title='Souscriptions realises'
        fetch(apiresult).then(resp => resp.json())
                        .then(data => this.getChilds(data))                                    
    }
    
    getChilds(node){
       node.forEach(n => {
            if(n.fils.length){//parent
                this.getChilds(n.fils)
            }else {
                this.listelts.push({...n, isVisible: true})
            } 
        });
    }

    deleteItem(e){
        const numero = e.target.dataset.itemNumero
        console.log(numero);

        this.listelts.map( node => {
            if (node.numero  == numero) node.isVisible = false;
        });

        this.toJSON();
    }

    toJSON() {

        const date = new Date();

        const outputJSON = this.listelts.map( (child, index) => {
            return {
                "noResultat": index,// increment
                "codeCategorieResultat": "P",////codeResultat , par default mettre 'P'
                "noPersonneConcernee": null,
                "indCouple": false,
                "codeSuiteDonneeOrigine": null,
               // "dateSuppression": !child.isVisible ? new Date().toLocaleDateString('en-CA').split('-').map( elt => elt.length < 2 ? '0' + elt : elt ).join('') : null,// si isvisible => mettre la date au format yyyymmdd sinon null
                "dateSuppression": !child.isVisible ? new Date().toISOString().slice(0,10).replaceAll('-','') : null,// si isvisible => mettre la date au format yyyymmdd sinon null
                "noTypeResultat": child.numero, //numero
                "conditions": null,
                "noContratSouscrit": null,
                "noTypeCloture": "0"
            }
        })
        console.clear()
        console.log('result', JSON.parse(JSON.stringify(outputJSON)))
    }
}