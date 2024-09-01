import { LightningElement, wire, track } from 'lwc';
import getProdutos from '@salesforce/apex/ProdutoController.getProdutos';
import deleteProduto from '@salesforce/apex/ProdutoController.deleteProduto';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

export default class ProdutoDataTable extends NavigationMixin(LightningElement) {
    @track produtos;
    @track columns = [
        { 
            label: 'Nome', 
            fieldName: 'Name', 
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'Name' },
                target: '_self'
            }
        },
        { label: 'Preço', fieldName: 'Preco_Produto__c', type: 'currency' },
        { label: 'Descrição', fieldName: 'Descricao_Produto__c' },
        { label: 'Código', fieldName: 'Codigo_Produto__c' },
        {
            type: 'action',
            typeAttributes: { rowActions: this.getRowActions }
        }
    ];
    @track isModalOpen = false;
    @track modalTitle = '';
    @track selectedRecordId;

    @wire(getProdutos)
    wiredProdutos(result) {
        const { data, error } = result;
        if (data) {
            this.produtos = data;
        } else if (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'edit') {
            this.selectedRecordId = row.Id;
            this.modalTitle = 'Editar Produto';
            this.isModalOpen = true;
        } else if (actionName === 'delete') {
            this.handleDelete(row.Id);
        }
    }

    handleNew() {
        this.selectedRecordId = null;
        this.modalTitle = 'Novo Produto';
        this.isModalOpen = true;
    }

    handleClose() {
        this.isModalOpen = false;
    }

    getRowActions(row, doneCallback) {
        const actions = [
            { label: 'Editar', name: 'edit' },
            { label: 'Excluir', name: 'delete' }
        ];
        doneCallback(actions);
    }

    handleDelete(recordId) {
        deleteProduto({ productId: recordId })
            .then(() => {
                return refreshApex(this.wiredProdutosResult);
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
            });
    }

    refreshData() {
        return getProdutos().then(data => {
            this.produtos = data;
        }).catch(error => {
            console.error('Erro ao buscar produtos após exclusão:', error);
        });
    }

    handleRowClick(event) {
        const row = event.detail.row;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                actionName: 'view'
            }
        });
    }
}