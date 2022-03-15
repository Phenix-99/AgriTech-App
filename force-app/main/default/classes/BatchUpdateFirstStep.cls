global class BatchUpdateFirstStep implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext BC) {
         return Database.getQueryLocator([
                SELECT Id, Name, isUpdate__c, (SELECT Etape__c, Date__c FROM Notes__r WHERE Etape__c = 'Etape 0')
                FROM Project__c
                WHERE isUpdate__c = TRUE AND Etape_en_Cours__c = 0
        ]);
    }

    global void execute(Database.BatchableContext BC, List<Project__c> projects) {
        for (Project__c proj : projects) {
            for (Note__c note : proj.Notes__r) {
                if ((Integer.valueOf(System.today()) - Integer.valueOf(Note.Date__c)) >= 7) {
                    proj.Status__c = 'Pas à jour';
                }
            }
        }
    }
    global void finish(Database.BatchableContext BC) {
    }
}