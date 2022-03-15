trigger autoCreateFirstStep on Plant__c (after insert) {
    List<Plant__c> plist;
    for (Plant__c plant: Trigger.New) {
        Recommandation__c recom = new Recommandation__c(Etape__c = 'Etape 0', Plant__c = plant.Id, Name = 'Recommandation 0 - ' + plant.Name, Step_Rank__c = 0);
        insert recom;
        plist = Trigger.New;
    }
    system.debug(plist);
}