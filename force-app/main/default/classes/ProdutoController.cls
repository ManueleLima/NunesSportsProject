public with sharing class ProdutoController {
    @AuraEnabled(cacheable=true)
    public static List<Produto__c> getProdutos() {
        try {
            return [SELECT Id, Name, Preco_Produto__c, Descricao_Produto__c, Codigo_Produto__c FROM Produto__c Limit 10000];
        } catch (Exception e) {
            throw new AuraHandledException('Erro ao buscar produtos: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteProduto(Id productId) {
        try {
            Produto__c produto = [SELECT Id FROM Produto__c WHERE Id = :productId LIMIT 1];
            delete produto;
        } catch (Exception e) {
            throw new AuraHandledException('Erro ao excluir produto: ' + e.getMessage());
        }
    }
}
