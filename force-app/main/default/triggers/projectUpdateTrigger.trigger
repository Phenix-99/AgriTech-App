trigger projectUpdateTrigger on Note__c (after insert, after update) {
    List<Project__c> listProj = new List<Project__c>();
    for(Note__c n:Trigger.New){
        System.debug('projectUpdateTrigger Note__c : ' + n);
        Project__c proj = [SELECT Id, Etape_en_Cours__c, Etat__c, Status__c FROM Project__c WHERE Id=:n.Project__c LIMIT 1];
        system.debug('>>>>>Etape en cours'+n.Step_Rank__c);
        if((n.Step_Rank__c == proj.Etape_en_Cours__c && n.Description__c != null && n.Description__c.length() > 10) || (proj.Etat__c == 'Terminé') || (proj.Etat__c == 'Annulé')){
            proj.Status__c = 'A jour';
        }else {
            proj.Status__c = 'Pas à jour';
        }
        listProj.add(proj);
    }
    update listProj;
}