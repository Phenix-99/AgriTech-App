public class ClientResponse {

    @auraenabled(cacheable=true)
    public static List<T6L2PSD_mdt__mdt> getClientResponsList(Id accountId) {
       // Map<String, String> result = new Map<String, String>();
        Account acc = [SELECT Id, Code_EFS__c FROM Account WHERE Id =: accountId LIMIT 1];
        //List<T6L2PSD_mdt__mdt> T6L2PSD = [SELECT code__c, libelle__c FROM T6L2PSD_mdt__mdt];
       return [SELECT code__c, libelle__c FROM T6L2PSD_mdt__mdt where EFS__c = :acc.Code_EFS__c];
        /*for (T6L2PSD_mdt__mdt item: T6L2PSD) {
            result.put(item.code__c, item.libelle__c);
        }
        string jsonstring = JSON.serialize(result);
        return jsonstring;*/
    }
}