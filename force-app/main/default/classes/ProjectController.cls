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

    //Get Information about the project Profile
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjectProfil(Id projectId){
        List<Project__c> projects = [SELECT Name,Superficy__c,Region__c,Pays__c,Localisation__c,
                                    Date_Prise_Contact__c,Date_De_Semis__c,Date_Recolte__c,
                                    Farmer__r.Name,Farmer__r.Biography__c,Farmer__r.Source__c,Farmer__r.Phone__c,Farmer__r.Whatsapp__c,Farmer__r.Email__c,Farmer__r.Hold_Agrix__c,
                                    plant__r.Name,(SELECT Severite__c FROM Notes__r) FROM Project__c WHERE Id =: projectId];
        return projects;
    }
 
}