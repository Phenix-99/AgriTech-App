/**
 * Created by max on 24/03/2022.
 */

import {api, LightningElement} from 'lwc';

export default class LwcNoeudEnfant extends LightningElement {
    @api value;
    @api level;
}