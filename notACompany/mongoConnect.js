const MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";

var lCollection;
var connect = (collection,next)=>{
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        // getting database called notACompanyLoginInfo                     
        var dbo = database.db("notACompanyLoginInfo")
        lCollection=dbo.collection(collection); 
      
        next(null,lCollection);      
    })
    
}
module.exports=connect;


