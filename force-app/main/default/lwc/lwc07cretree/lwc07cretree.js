/**
 * Created by max on 23/03/2022.
 */

import {LightningElement} from 'lwc';

import apiresult from '@salesforce/resourceUrl/apiresult';

export default class LWC07CRE_Tree extends LightningElement {
    apiresult;
    level=1;
    selectedKey;
    selectedItem;
    connectedCallback() {

        const xhr = new XMLHttpRequest();
        xhr.open("GET", apiresult);
        xhr.onload = () =>console.log (this.apiresult =JSON.parse( xhr.responseText));
        xhr.send(null);
    }
    itemSelected(e){
        this.selectedKey=e.detail.key;
        this.selectedItem=e.detail.item;
        console.log('selected',JSON.parse(JSON.stringify( e.detail)))
        this.dispatchEvent(new CustomEvent("select", {
            detail: {
                ...e.detail
            }
        }));
    }
}