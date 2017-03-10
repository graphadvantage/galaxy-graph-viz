var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"),{encrypted:false});

var session = driver.session();

var counter = function() {

  var start = Date.now();
  return {
    start : Date.now(),
    count : 0,
    onNext: function(record) {
      this.count++;
      console.log(record._fields);
    },
    onCompleted: function() { console.log("rows",this.count,"took",(Date.now()-start),"ms"); }};
};

//generate 100000 nodes with labels Bolt and Individual
session.run("CYPHER CALL generate.nodes(['Bolt','Individual'], '{individualId: randomNumber, firstName: firstName, lastName: lastName}', 100000)").subscribe(counter());


// load a 100000 rows in memory
//session.run("CYPHER MATCH (n:Bolt:Individual) RETURN n.firstName + ' ' + n.lastName AS fullName LIMIT 1000000;").subscribe(counter());


// load all Touches in memory
//session.run("CYPHER MATCH (a:Activity)-[:TOUCHED]->(i:Individual) RETURN a,i").subscribe(counter());
