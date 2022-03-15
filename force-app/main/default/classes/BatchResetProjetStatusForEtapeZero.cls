global class BatchResetProjetStatusForEtapeZero implements Database.Batchable<sObject>,Schedulable {
    global Database.QueryLocator start(Database.BatchableContext BC) {
         return Database.getQueryLocator([
                SELECT Id, Name, isUpdate__c, (SELECT Etape__c, Date__c FROM Notes__r WHERE Etape__c = 'Etape 0')
                FROM Project__c
                WHERE isUpdate__c = TRUE AND Etape_en_Cours__c = 0
               //  and id='a057Q000000zg8NQAQ'
        ]);
    }

    global void execute(Database.BatchableContext BC, List<Project__c> projects) {
        for (Project__c proj : projects) {
            for (Note__c note : proj.Notes__r) {
                if (note.Date__c.daysBetween (System.today()) >= 7) {
                    proj.Status__c = 'Pas à jour';
                }
            }
        }
        update projects;
    }
    global void finish(Database.BatchableContext BC) {
    }


    global static void start(){
        Database.executeBatch(new BatchResetProjetStatusForEtapeZero());
    }

    global void execute(SchedulableContext param1) {
        BatchResetProjetStatusForEtapeZero.start();
    }
}