var wkt = require('terraformer-wkt-parser');

var helpers = {
	getSegment: function(url, index) {
		return url.replace(/^https?:\/\//, '').split('/')[index];
	},
	allBuildingQuery: function(){
		const sparqlQuery = `

			PREFIX hg: <http://rdf.histograph.io/>
			PREFIX dct: <http://purl.org/dc/terms/>
			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			PREFIX geo: <http://www.opengis.net/ont/geosparql#>

			SELECT ?building ?buildingLabel ?wkt (COUNT(DISTINCT ?cho) AS ?count)  WHERE {
				?building a hg:Building .
				?building rdfs:label ?buildingLabel .
				?cho dct:spatial ?building .
				?building geo:hasGeometry/geo:asWKT ?wkt .
			}
			GROUP BY ?building ?buildingLabel ?wkt
			ORDER BY DESC (?count)
			LIMIT 50

			`;
		//Encode the query
		const encodedQuery = encodeURIComponent(sparqlQuery);

		//Save the data url
		return 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedQuery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';
	},
	buildingDetailQuery: function(name){
		const sparqlQuery = `

		PREFIX hg: <http://rdf.histograph.io/>
		PREFIX dct: <http://purl.org/dc/terms/>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX foaf: <http://xmlns.com/foaf/0.1/>
		PREFIX void: <http://rdfs.org/ns/void#>
		PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>

		SELECT DISTINCT ?cho ?building ?img ?col ?date  WHERE {

		 ?cho dct:spatial ?b .
		 ?b a hg:Building .
		 ?b rdfs:label ?building .

		 ?cho foaf:depiction ?img .
		 ?cho void:inDataset ?col .
		 ?cho foaf:depiction ?img .
		 ?cho sem:hasBeginTimeStamp ?date .

		 FILTER REGEX(?building,"${name}")
		}
		ORDER BY ?date

		`;
		//Encode the query
		const encodedQuery = encodeURIComponent(sparqlQuery);

		//Save the data url
		return 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedQuery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

	}



};

module.exports = helpers;
