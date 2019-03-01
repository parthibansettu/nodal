$(document).ready(function(){
	// Lists Step Definitions files
	$('#stepDefinitionFilesListHolder').ready(function(){
		$.get('/fetch_step_def_files', function(step_def_files){
			$('#stepDefinitionsFilesList').html(step_def_files);
		});
	});

	// Lists Folders under features folder
	$('#featureFileExportHolder').ready(function(){
		$.get('/fetch_project_folders_feature', function(project_folders){
			$('#projectListForFeature').html(project_folders);
		})
	});

	// Enables Feature File Preview and Export to File
	$('#createNewFeature').click(function(){
		let featureTitle = $('#featureTitle').val();
		let featureDescription = $('#featureDescription').val();
		if(featureTitle != '' && featureDescription != ''){
			$('#featureListHolder').attr('style', 'visibility: visible');
			$('#resetFeatureFile').attr('style', 'visibility: visible');
			$('#featureTitleContent').html('Feature : ' + featureTitle + '\r\n');
			$('#featureDescriptionContent').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + featureDescription + '\r\n\r\n');
			$('#scenarioOutlineHolder').attr('style', 'visibility: visible');
			$('#createNewFeature').attr('style', 'visibility: hidden');
			$('#featureFileExportHolder').attr('style', 'visibility: visible');
			$('#createFeatureForPreviewError').html('');
		}
		else {
			$('#createFeatureForPreviewError').html('**Feature title and description are mandatory');
		}
	});

	// Displays scenario input textarea based on options
	$('#scenarioOutlineList').change(function(){
		if($(this).val() == 'Add New Scenario') {
			$('#addNewScenarioHolder').attr('style', 'visibility: visible');
		}
		else {
			$('#addNewScenarioHolder').attr('style', 'visibility: hidden');
		}
	});

	// Updates Scenario dropdown with added scenario
	$('#updateScenarioList').click(function(){
		let addedScenario = $('#addScenarioOutline').val();
		let scenarioValue = 'scenario' + (Number($('#scenarioOutlineList').children("option").length) - 1);
		if(addedScenario != ''){
			$('#scenarioOutlineList').append($('<option>', { value: scenarioValue, text: addedScenario, selected: true }));
			$('#addScenarioOutline').val('');
			$('#addNewScenarioHolder').attr('style', 'visibility: hidden');
			$('#featureStepHolder').attr('style', 'visibility: visible');
			$('#scenarioContainer').append('<div id="'+scenarioValue+'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scenario Outline: ' + addedScenario + '\r\n</div>');
		}
		else {
			$('#createFeatureForPreviewError').html('**Please fill Scenario text');
		}
	});

	// Returns All Steps from all files or selected files
	$('#stepDefAll').click(function() {
		let selectedStepDefFile = $('#stepDefinitionFiles').children("option:selected").val();
		$.get('/read_step_def?file_chosen='+selectedStepDefFile, function(step_defs){
			$('#stepDefinitions').html(step_defs);
		});
	});

	// Returns Given Steps from all files or selected files
	$('#stepDefGiven').click(function(){
		let selectedStepDefFile = $('#stepDefinitionFiles').children("option:selected").val();
		$.get('/read_specific_step_def?type=Given&file_chosen='+selectedStepDefFile, function(step_defs){
			$('#stepDefinitions').html(step_defs);
		});
	});

	// Returns When Steps from all files or selected files
	$('#stepDefWhen').click(function(){
		let selectedStepDefFile = $('#stepDefinitionFiles').children("option:selected").val();
		$.get('/read_specific_step_def?type=When&file_chosen='+selectedStepDefFile, function(step_defs){
			$('#stepDefinitions').html(step_defs);
		});
	});

	// Returns Then Steps from all files or selected files
	$('#stepDefThen').click(function(){
		let selectedStepDefFile = $('#stepDefinitionFiles').children("option:selected").val();
		$.get('/read_specific_step_def?type=Then&file_chosen='+selectedStepDefFile, function(step_defs){
			$('#stepDefinitions').html(step_defs);
		});
	});

	// Adds newly entered Feature steps into Feature File Preview area
	$('#addNewFeatureStep').click(function(){
		let selectedType = $('#gherkinType').children("option:selected").val();
		let enteredText = $('#featureStep').val();
		let underScenario = $('#scenarioOutlineList').children("option:selected").val();
		let existingFeaturesCount = $('#'+underScenario+' > div').length;
		let featureSuffix = existingFeaturesCount + 1;
		if(enteredText != ''){
			$('#'+underScenario).append('<div id="' + underScenario + '-feature' + featureSuffix + '"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + selectedType + ' ' + enteredText + '\r\n\n</div>');
			$('#createFeatureForPreviewError').html('');
		}
		else{
			$('#createFeatureForPreviewError').html('**Please fill feature step text');
		}
	});

	// Adds existing Steps to Feature File Preview area
	$('#addStepToFeature').click(function(){
		let enteredFeatureTitle = $('#featureTitle').val();
		let enteredFeatureDescription = $('#featureDescription').val();
		let enteredScenario = $('#scenarioOutlineList').children("option:selected").text();
		let chosenStep = $('#chooseStepDefinitions').children("option:selected").text();
		if(enteredFeatureTitle == "" && enteredFeatureDescription == "") {
			$('#createFeatureForPreviewError').html('Please Create New Feature file to proceed!');
			return;
		}
		if(enteredScenario == "" || enteredScenario == "Add New Scenario"){
			$('#createFeatureForPreviewError').html('Please add new scenario or choose added scenario to begin with!');
			return;
		}
		if(chosenStep == ""){
			$('#createFeatureForPreviewError').html('Please choose step definition to add!');
			return;
		}
		let underScenario = $('#scenarioOutlineList').children("option:selected").val();
		let existingFeaturesCount = $('#'+underScenario+' > div').length;
		let featureSuffix = existingFeaturesCount + 1;
		$('#'+underScenario).append('<div id="' + underScenario + '-feature' + featureSuffix + '"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + chosenStep + '\r\n\n</div>');
		$('#createFeatureForPreviewError').html('');
	});

	// Adds new folder under Feature folder
	$('#projectListForFeature').on('change', '#featureProjectFolders', function(){
		if($(this).val() == 'Add New Folder') {
			$('#addNewFolderHolder').attr('style', 'visibility: visible');
		}
		else {
			$('#addNewFolderHolder').attr('style', 'visibility: hidden');
		}
	});

	// Adds Folder under Features folder
	$('#addFolderUnderFeatures').click(function(){
		let folderToAdd = $('#addFeaturesFolder').val();
		if(folderToAdd != ''){
			$.get('/create_feature_folder?name='+folderToAdd, function(folder_created){
				$('#folderCreated').html(folder_created);
			})
			$('#featureProjectFolders').append($('<option>', { value: folderToAdd, text: folderToAdd, selected: true }));
			$('#addFolderUnderFeatures').removeAttr('value');
			$('#addNewFolderHolder').attr('style', 'visibility: hidden');
		}
		else {
			$('#exportErrorMessage').html('**Please enter folder name!');
		}
	});

	// Resets all fields and takes back to original state
	$('#resetFeatureFile').click(function(){
			$('#featureListHolder').attr('style', 'visibility: hidden');
			$('#featureStepHolder').attr('style', 'visibility: hidden');
			$('#createNewFeature').attr('style', 'visibility: visible');
			$('#featureFileExportHolder').attr('style', 'visibility: hidden');
			$('#scenarioOutlineList').empty();
			$('#scenarioOutlineList').append($('<option>', { value: '', text: '' }));
			$('#scenarioOutlineList').append($('<option>', { value: 'Add New Scenario', text: 'Add New Scenario' }));
			$('#scenarioOutlineHolder').attr('style', 'visibility: hidden');
			$('#featureTitleContent').empty();
			$('#featureDescriptionContent').empty();
			$('#scenarioContainer').empty();
			$('#featureProjectFolders').attr('disabled', false);
			$('#addFeatureFileName').attr('disabled', false);			
			$('#addFeatureFileName').val('');
			$('#resetFeatureFile').attr('style', 'visibility: hidden');
	});

	// Exports steps from Feature File Preview to .feature file
	$('#createFeatureFile').click(function(){
		let folderName = $('#featureProjectFolders').children("option:selected").val();
		let fileName = $('#addFeatureFileName').val();
		if(folderName == ""){
			$('#exportErrorMessage').html('**Please choose or add folder!');
			return;
		}
		if(fileName == ""){
			$('#exportErrorMessage').html('**Please enter filename!');
			return;
		}
		let featureSteps = [];
		let featureTitleToFile = $('#featureTitleContent').text();
		featureSteps.push(featureTitleToFile);
		let featureDescriptionToFile = $('#featureDescriptionContent').text();
		featureSteps.push(featureDescriptionToFile);
		let featureScenarioCount = $('#scenarioContainer > div[id^=scenario]').length;
		for(let i=1;i<=featureScenarioCount;i++){
			let scenarioMap = [];
			let scenarioStepCount = $('#scenario' + i + ' > div').length;
			scenarioMap.push($($('#scenario' + i).contents()[0]).text());
			for(let j=1;j<=scenarioStepCount;j++){
				scenarioMap.push($('#scenario' + i + '-feature' + j).text());
			}
			featureSteps.push(scenarioMap);
		}

		let filePath = './features/' + folderName + '/' + fileName + '.txt';
		$.get('/create_feature_file?path='+ filePath + '&steps='+featureSteps, function(file_created){
			$('#exportMessage').html(file_created);
			$('#exportErrorMessage').html('');
		})
		$('#featureProjectFolders').attr('disabled', true);
		$('#addFeatureFileName').attr('disabled', true);
	});
});

// Puts an alert when browser is refreshed or closed
function dontClose(){
	return "";
}