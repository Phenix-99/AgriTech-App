public without sharing class ProjectController {
    // To-Do
    // get all projects of a farmer by his name
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getFarmerProjectsByHisName(String farmerName) {
        List<Project__c> projects = [SELECT Id, Farmer__r.Name, Farmer__r.Phone__c,
                                  (SELECT Etape__c, Severite__c FROM Notes__r), Plant__r.Name,
                                  Pays__c, Region__c, Status__c FROM Project__c
                                  WHERE Farmer__r.Name LIKE : + '%' + farmerName +'%'];
        
        return projects;
    }
    
    // get all projects
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getAllProjects() {
        List<Project__c> projects = [SELECT Id, Farmer__r.Name, Farmer__r.Phone__c,
                                  (SELECT Etape__c, Severite__c FROM Notes__r), Plant__r.Name,
                                  Pays__c, Region__c, Status__c FROM Project__c];
        
        return projects;
    }
    
    //Get Information about the project Profile
    @AuraEnabled(cacheable=true)
    public static List<Project__c> getProjectProfil(Id projectId){
        List<Project__c> projects = [SELECT Id,Name,Superficy__c,Region__c,Pays__c,Localisation__c,
                                    Date_Prise_Contact__c, Date_De_Semis__c, Date_Anticipe_Recolte__c, Farmer__r.Id,
                                    Farmer__r.Name, Farmer__r.Biography__c, Farmer__r.Source__c, Farmer__r.Phone__c, Farmer__r.Whatsapp__c,Farmer__r.Email__c,Farmer__r.Hold_Agrix__c,
                                    plant__r.Name,(SELECT Severite__c FROM Notes__r) FROM Project__c WHERE Id =: projectId];
        return projects;
    }

    // get related project
    @AuraEnabled(cacheable=true)
    public static List<Project__c> retrieveProjects(Id cultivateurId, Id projIdLoad) {
        
            Farmer__c culti=[SELECT Id, Name, (SELECT Id, Name FROM Projects__r) FROM Farmer__c WHERE Id=:cultivateurId LIMIT 1];
            List<Project__c> projListAll= culti.Projects__r;
            List<Project__c> projList= new List<Project__c>();
            for (Project__c proj : projListAll) {
                if (proj.Id!=projIdLoad) {
                    projList.add(proj);
                }
            }
            return projList;
        
    }

    //Get Recommantion about a specific plant hold in a specific project
    @AuraEnabled(cacheable=true)
    public static List<Recommandation__c> getPlantRecom(Id projectId){
        return [SELECT Id, Etape__c, Text__c, Step_Rank__c FROM Recommandation__c WHERE Plant__c IN (SELECT Plant__c FROM Project__c WHERE Id=: projectId) ORDER BY Step_Rank__c ASC ];
    }

    
    //Get Last Recommantion for a specific project
    @AuraEnabled(cacheable=true)
    public static String getCurrentStep(Id projectId) {

        Project__c proj = [SELECT Etape_en_Cours__c, Plant__c FROM Project__c WHERE Id = :projectId];
        
        List<Recommandation__c> recomList = [SELECT Id, Etape__c FROM Recommandation__c WHERE Step_Rank__c =:proj.Etape_en_Cours__c AND Plant__c=:proj.Plant__c];
    
        return recomList[0].Etape__c;
    }

        
    //Get Last Recommantion for a specific project
    @AuraEnabled(cacheable=true)
    public static Recommandation__c getRecommandationByRank(Decimal stepRank, Id plantId) {

        List<Recommandation__c> recomList = [SELECT Id, Etape__c,Text__c FROM Recommandation__c WHERE Step_Rank__c =:stepRank AND Plant__c=:plantId];
    
        return recomList[0];
    }

    //Get current Note for a specific project
    @AuraEnabled(cacheable=true)
    public static ID getProjectNoteByStepRank(Id projectId, Decimal stepRank) {
        List<Note__c> noteList = [SELECT Id FROM Note__c WHERE Project__c = :projectId AND Step_Rank__c = :stepRank LIMIT 1];
        return noteList[0].Id;
    }
}