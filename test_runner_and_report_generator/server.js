import express from 'express';
let app = express();
import opn from 'opn';
import fetchdata from './fetch_files_data.js';

// Launching Runner and Report Generation Page
opn('http://localhost:8081/', {app: 'Chrome'});
app.use(express.static(__dirname));

// Route to render the Runner and Report Generation Page
app.get('/', function(req, res){
    res.sendFile("index.html");
})

// Route to get the workflow select list
app.get('/workflow', function(req, res){
	res.send(fetchdata.getworkflow());
})

// Route to run the feature file and generate the report
app.get('/selected_feature', function(req, res){
	let feature = req.query.items;
	let workflow = req.query.sel;
	res.send(fetchdata.getconfigfiletorun(feature,workflow));
})

// Route to get the feature file list based on the given work flow
app.get('/workflow_feature', function(req, res){
	let workflow_name = req.query.workflow_name;
	res.send(fetchdata.getfeaturefilelist(workflow_name));
})

// Route to launch the html report
app.get('/html_result', function(req, res){
	let file_name = fetchdata.gethtmlreportfilename();
	opn('file:///'+ __dirname + "/../reports/html-results/"+ file_name , {app: 'Chrome'});
})

// Route to launch the allure report
app.get('/allure_result', function(req, res){
	fetchdata.getallurereport();
})

// Local Server listening at port 8081.
let server = app.listen(8081, function(){
	let host = server.address().address;
	let port = server.address().port;
	console.log("App started at http://%s:%s", host, port);
})