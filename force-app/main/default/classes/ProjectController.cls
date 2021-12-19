public class ProjectController {
    // To-Do
    // get all projects of a farmer by his name
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getFarmerProjectsByHisName(String farmerName) {
        List<Project__c> projects = [SELECT Id, Farmer__r.Name, Farmer__r.Phone__c,
                                  (SELECT Etape__c, Severite__c FROM Notes__r), Plant__r.Name,
                                  Pays__c, Region__c, Status__c FROM Project__c
                                  WHERE Farmer__r.Name =: farmerName];
        
        return projects;
    }
}