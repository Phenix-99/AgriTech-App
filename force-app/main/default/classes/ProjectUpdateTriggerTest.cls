@isTest
public class ProjectUpdateTriggerTest {
    
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
        System.Test.StartTest();   
        insert note;
        System.Test.StopTest();
        Project__c proj=[SELECT isUpdate__c,Status__c FROM Project__c WHERE Name='projet1' Limit 1];
        System.assertEquals(false,proj.isUpdate__c);
        System.assertEquals('Pas à jour',proj.Status__c);
    }
}