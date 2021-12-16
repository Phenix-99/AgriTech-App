public with sharing class projectRelatedController {
    public projectRelatedController() {

    }
    @AuraEnabled
    public static List<Project__c> retrieveProjects(Id cultivateurId) {
        try {
            List<Farmer__c> culti=[SELECT Id, Name, (SELECT Id, Name FROM Projects__r) FROM Farmer__c WHERE Id=:cultivateurId];
            List<Project__c> projList= culti[0].Projects__r;
            return projList;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
       
    }
}
