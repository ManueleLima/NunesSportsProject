trigger ProdutoTrigger on Produto__c (before insert, before update) {
    ProdutoTriggerHandler.validateProdutos(Trigger.new, Trigger.oldMap);
}