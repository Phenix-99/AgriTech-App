trigger autoCreateFirstStep on Plant__c (after insert) {
    List<Recommandation__c> recommandations0 = new List<Recommandation__c>();
    for (Plant__c plant : Trigger.New) {
        recommandations0.add(
                new Recommandation__c(Etape__c = 'Etape 0', Plant__c = plant.Id, Name = 'Recommandation 0 - ' + plant.Name, Step_Rank__c = 0)
        );
    }
    insert recommandations0;
}