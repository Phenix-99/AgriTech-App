trigger projectUpdateTrigger on Note__c (after insert, after update) {
    
    List<Project__c> listProj = new List<Project__c>();
    for(Note__c n:Trigger.New){
        
        Project__c proj =[SELECT Id,Etape_en_Cours__c,isUpdate__c FROM Project__c WHERE Id=:n.Project__c LIMIT 1];
        String etapeEnCours = String.valueOf(proj.Etape_en_Cours__c);
        system.debug(etapeEnCours);
        if(n.Etape__c == etapeEnCours && n.Description__c!=null && n.Description__c.length()>10){
            proj.isUpdate__c =true;
        }else {
            proj.isUpdate__c =false;
        }
        listProj.add(proj);
    }
    update listProj;
    
}