public class ProjectController {
    // To-Do
    // get all projects of a farmer by his name
    @AuraEnabled(cacheable=true)
    public static List<SObject> getFarmerProjectsByHisName(String farmerName) {
        List<SObject> projects = [SELECT Id, Farmer__r.Name, Farmer__r.Phone__c, Plant__r.Name,
                                     Pays__c, Region__c, Status__c FROM Project__c
                                     WHERE Farmer__r.Name =: farmerName];
        
        return projects;
    }
}