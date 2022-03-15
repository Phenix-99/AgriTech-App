public class ProjectNotes {
    public ProjectNotes(ApexPages.StandardController controller) { }

    public List<Note__c> getNotes() {
        String projectId = System.currentPagereference().getParameters().get('id');
        return [SELECT Name, Description__c, Etape__c, Severite__c, Step_Rank__c FROM Note__c WHERE Project__c =: projectId];
    }
}