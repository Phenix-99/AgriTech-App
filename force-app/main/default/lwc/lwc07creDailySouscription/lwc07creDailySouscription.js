import { LightningElement, track } from 'lwc';
import apiresult from '@salesforce/resourceUrl/apiresult';

export default class Lwc07creDailySouscription extends LightningElement {
    apiresult
    @track listelts = [];

    connectedCallback() {
        fetch(apiresult).then(resp => resp.json())
                        .then(data => console.log(this.apiresult = data ))
                        .then( () => {
                            console.clear();
                            this.getChilds(this.apiresult, this.listelts);
                            // console.log(this.listelts);
                        });
    }

    getChilds(parent, contain, ...args) {
        parent.forEach( noeud => {
            if (noeud.fils.length) {
                this.getChilds(noeud.fils, contain, true)
            } else {
                // {...noeud, 'key': this.randomUuid()}
                if (args && args[0] === true) contain.push(noeud)
            }
        });
    }

    /* randomUuid() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const length = 32;
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    } */

}