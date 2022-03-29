global class BatchResetProjectUpdateStatus implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator([
                SELECT Plant__r.Periodicite_Jours__c,Etape_en_Cours__c, (SELECT Step_Rank__c,Description__c FROM Notes__r)
                FROM Project__c
                WHERE isUpdate__c = TRUE
                and id = 'a057Q000000zarLQAQ'
        ]);
    }

    global void execute(Database.BatchableContext BC, List<Project__c> projects) {
        for (Project__c proj : projects) {
            Map<Decimal, Note__c>noteEtapeMap = new Map<Decimal, Note__c>();
            for (Note__c note : proj.Notes__r) {
                noteEtapeMap.put(note.Step_Rank__c, note);
            }
            if (noteEtapeMap.containsKey(proj.Etape_en_Cours__c) && String.isBlank(noteEtapeMap.get(proj.Etape_en_Cours__c).Description__c)) {
                proj.Status__c = 'Pas à jour';
            }
            if (!noteEtapeMap.containsKey(proj.Etape_en_Cours__c) ) {
                proj.Status__c = 'Pas à jour';
            }
        }
    }
    global void finish(Database.BatchableContext BC) {
    }

    global static void start(){
        Database.executeBatch(new BatchResetProjectUpdateStatus());
    }
}