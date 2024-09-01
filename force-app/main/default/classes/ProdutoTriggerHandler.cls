public class ProdutoTriggerHandler {
    
    
    public static void validateProdutos(List<Produto__c> newRecords, Map<Id, Produto__c> oldRecords) {
        
        for (Produto__c prod : newRecords) {
            if (prod.Preco_Produto__c <= 0) {
                prod.Preco_Produto__c.addError('O preço do produto deve ser maior que zero.');
            }
        }
    }
}
