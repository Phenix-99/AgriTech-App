public class BatchPrint {
    
    private ApexPages.StandardSetController standardController;
    
    public List<Project__c> projectList {get;set;}
    
    private Set <Id> ProjectIds = new Set<Id>();

    public BatchPrint(ApexPages.StandardSetController standardController) {
        
        this.standardController = standardController;
        
        projectList = new List<Project__c>();
        
        for (Project__c project : (List<Project__c>)standardController.getSelected()){
            ProjectIds.add(project.Id);
        }
        
        projectList = [SELECT Id, Name, Pays__c, Region__c, Localisation__c, Date_De_Semis__c, 
                       Superficy__c, Plant__r.Name, Farmer__r.Name, Farmer__r.Age__c, Farmer__r.Whatsapp__c, Farmer__r.Phone__c,
                       field_ready__c, good_field__c, good_budget__c, good_seed__c,
                       get_good_watering_way__c, is_field_accessible__c, way_to_sell_product__c,
                       remote_experience_farmer__c, bank_favorable__c, montant_du_credit__c,
                       Frais_Agrix_Tech__c, autre_montant__c, Date_Recolte__c,
                       Printed_Reference__c FROM Project__c WHERE Id IN: ProjectIds];
    }
}