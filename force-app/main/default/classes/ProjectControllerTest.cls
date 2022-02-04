@isTest
public class ProjectControllerTest {
	 @isTest
    public static void Test(){
        Farmer_Advisor__c farAd=new Farmer_Advisor__c(Name='Farmeradvisor1');
        insert farAd;
        Farmer__c far=new Farmer__c(Farmer_Advisor__c=farAd.Id,Name='farmer1');
        insert far;
        Plant__c plt=new Plant__c(Name='plant1',Farmer_Advisor__c=farAd.Id);
        insert plt;
        Project__c pj=new Project__c(Plant__c=plt.id,
                                     Farmer__c=far.Id,
                                     Name='projet1');
        insert pj;
        
        Note__c note=new Note__c(Name='Note1',Etape__c='etape1',Project__c=pj.Id,Step_Rank__c=1);
        insert note;
        Recommandation__c rec= new Recommandation__c(Name='recom1', Plant__c=plt.Id,Step_Rank__c=1);
        insert rec;
        System.Test.StartTest();   
        ProjectController.getFarmerProjectsByHisName(far.Name);
        ProjectController.getAllProjects();
        ProjectController.getProjectProfil(pj.Id);
        ProjectController.retrieveProjects(far.Id,pj.Id);
        ProjectController.getPlantRecom(pj.Id);
        ProjectController.getProjectNoteByStepRank(pj.Id,note.Step_Rank__c);
        ProjectController.getCurrentStep(pj.Id);
        System.Test.StopTest();
    }  
}