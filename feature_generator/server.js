import express from 'express';
let app = express();
import opn from 'opn';
import featureGenFun from './feature_generator_functions.js';

// Launching Feature Generator Page
opn('http://localhost:8081/', {app: 'Chrome'});
app.use(express.static(__dirname));

// Route to render the Feature Generator Page
app.get('/', function(req, res){
	res.sendFile("index.html");
})

// Route to get the step definition files
app.get('/fetch_step_def_files', function(req, res){
	res.send(featureGenFun.getStepDefinitionFiles());
})

// Route to get the feature project folders
app.get('/fetch_project_folders_feature', function(req, res){
	res.send(featureGenFun.getFeatureProjectFolders());
})

// Route to read the step defintions
app.get('/read_step_def', function(req, res){
	let fileChosen = req.query.file_chosen;
	if(fileChosen == "No"){
		res.send(featureGenFun.getAllStepsFromFiles());
	}
	else {
		res.send(featureGenFun.getAllStepsFromChosenFile(fileChosen));
	}
})

// Route to read a specific step definition
app.get('/read_specific_step_def', function(req, res){
	let fileChosen = req.query.file_chosen;
	let stepType = req.query.type;
	if(fileChosen == "No"){
		res.send(featureGenFun.getSpecificStepsFromFiles(stepType));
	}
	else{
		res.send(featureGenFun.getSpecificStepsFromChosenFile(fileChosen, stepType));

	}
})

// Route to create a feature file
app.get('/create_feature_file', function(req, res){
	let filePath = req.query.path;
	let featureText = req.query.steps;
	res.send(featureGenFun.createFeatureFile(filePath, featureText));
})

// Route to create a feature folder
app.get('/create_feature_folder', function(req, res){
	let folderName = req.query.name;
	res.send(featureGenFun.createFeatureFolder(folderName));
})

// Local Server listening at port 8081.
let server = app.listen(8081, function(){
	let host = server.address().address;
	let port = server.address().port;
	console.log("App started at http://%s:%s", host, port);
})