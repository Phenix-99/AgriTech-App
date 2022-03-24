/**
 * Created by max on 24/03/2022.
 */

import {LightningElement, api} from 'lwc';

export default class LwcNoeudParent extends LightningElement {
    @api value;
    @api entries;
    @api level;
    expanded;

    get level2() {
        return this.level + 1
    }
    get expandedClass() {
        return this.expanded ? "expanded" : ''
    }
    toggleExpand(){
        this.expanded=!this.expanded
    }
}