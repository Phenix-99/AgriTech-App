import { LightningElement ,api} from 'lwc';

export default class LwcFormBuilder extends LightningElement {

    @api formConfig;
    onValueChanged(e){
        this.dispatchEvent(new CustomEvent('valuechanged',{detail:{
                formConfig:this.formConfig.map(config => config.numero === e.detail.config.numero ? e.detail.config : config)
            }}))
    }
}
