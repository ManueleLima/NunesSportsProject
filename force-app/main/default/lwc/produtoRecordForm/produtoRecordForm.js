import { LightningElement, api, track } from 'lwc';

export default class ProdutoRecordForm extends LightningElement {
    @api recordId;
    @track formMode = 'edit';

    connectedCallback() {
        if (this.recordId) {
            this.formMode = 'edit';
        } else {
            this.formMode = 'new';
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-form').submit(fields);
    }
    handleSuccess(event) {
        const updatedRecordId = event.detail.id;
        console.log('Registro salvo com sucesso:', updatedRecordId);
    }
    handleError(event) {
        console.error('Erro ao salvar o registro:', event.detail.message);
    }
}