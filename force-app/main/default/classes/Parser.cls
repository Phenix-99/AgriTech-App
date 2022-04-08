public class Parser {
    
    public List<Resultat> parseJSONString(String jsonStr) {
        // String jsonStr = 'xx'; /* le json string en input */
        List<Resultat> resultats = new List<Resultat>();
        
        JSONParser parser = JSON.createParser(jsonStr);
        // Start at the array of invoices.
        if (parser.nextToken() != null && parser.getCurrentToken() == JSONToken.START_ARRAY) {
            while (parser.nextToken() != null) {
                if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                    // Read entire invoice object, including its array of line items.
                    Resultat res = (Resultat) parser.readValueAs(Resultat.class);
                    resultats.add(res);
                    parser.skipChildren();
                }
            }
        }
        return resultats;
    }
    
    public List<Resultat> mergeParsed(String jsonStr0, String jsonStr1, String jsonStr2) {
        List<Resultat> resultats = new List<Resultat>();
        
        resultats.addAll(parseJSONString(jsonStr0));
        resultats.addAll(parseJSONString(jsonStr1));
        resultats.addAll(parseJSONString(jsonStr2));
        
        for(Integer i = 0; i < resultats.size(); i++){
            resultats[i].noResultat = i;
        }
        
        return resultats;
    }
    
    
    public String resultToHTMLTable(String jsonStr, String codeCategorieResultat) {
        
        List<Resultat> inputList = parseJSONString(jsonStr);
        
        String HTMLTable = '<table><tr><td>noTypeResultat</td><td>noPersonneConcernee</td></tr><tr>';
        
        for(Resultat res: inputList) {
            if(res.codeCategorieResultat == codeCategorieResultat)
                HTMLTable += '<td>'+res.noTypeResultat+'</td><td>'+res.noPersonneConcernee+'</td>';               	
        }
        
        HTMLTable += '</tr><table>';
        
        return HTMLTable;
    }
    
    
    public class Resultat {
        public Integer noResultat {get;set;} 
        public String codeCategorieResultat {get;set;} 
        public String noPersonneConcernee {get;set;} 
        public Boolean indCouple {get;set;} 
        public String codeSuiteDonneeOrigine {get;set;} 
        public String dateSuppression {get;set;} 
        public Integer noTypeResultat {get;set;} 
        public List<Conditions> conditions {get;set;} 
        public String noContratSouscrit {get;set;} 
        public String noTypeCloture {get;set;} 
    }
    
    public class Conditions {
        public Integer numeroTypeCondition {get;set;} 
        public Double montant {get;set;} 
        public String date_Z {get;set;} // in json: date
        public String texte {get;set;} 
        public Double taux {get;set;} 
        public String code {get;set;} 
        
    }
    
}