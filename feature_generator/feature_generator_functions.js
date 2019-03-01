import fs from 'graceful-fs';
import nodedir from 'node-dir';
let stepsCounter = 0;

class FeatureGeneratorFunctions {

	// Gets Step Definitions Files
	getStepDefinitionFiles(){
		let stepDefFileContent = '<select id="stepDefinitionFiles">';
		stepDefFileContent += '<option value="No" selected> Do not filter by Step Definition File </option>';
		let stepDefFileExists = nodedir.files('./step_definitions', {sync:true});
		stepDefFileExists.forEach(function(filename){
			stepDefFileContent += '<option value="' + filename + '">' + filename + '</option>';
		});
		stepDefFileContent += '</select>';
		return stepDefFileContent;
	}
	
	// Gets folders under Features
	getFeatureProjectFolders(){
		let featureProjectFolderContent = '<select id="featureProjectFolders">';
		featureProjectFolderContent += '<option></option>';
		let dirs = fs.readdirSync('./features').filter(function (folder){
			return fs.statSync('./features' + '/' + folder).isDirectory();
		});
		dirs.forEach(function(filename){
			featureProjectFolderContent += '<option value="' + filename + '">' + filename + '</option>';
		});
		featureProjectFolderContent += '<option value="Add New Folder"> Add New Folder</option></select>';
		return featureProjectFolderContent;
	}

	/**
	 * Gets All steps from chosen file
	 * @param {String} file_name - Name of the file
	 */
	getAllStepsFromChosenFile(file_name){
		let fileContent = '(Filename: ' + file_name + ')<select multiple id="chooseStepDefinitions">';
		fileContent += this.fetchStepsFromFile(file_name, 'Given');
		fileContent += this.fetchStepsFromFile(file_name, 'When');
		fileContent += this.fetchStepsFromFile(file_name, 'Then');
		fileContent += '</select>';
		return fileContent;
	}

	/**
	 * Gets Specific steps from chosen file
	 * @param {String} file_name - Name of the file
	 * @param {String} step_type - steptype(example:  When/Then/AND)
	 */
	getSpecificStepsFromChosenFile(file_name, step_type){
		let fileContent = '(Filename: ' + file_name + ')<select multiple id="chooseStepDefinitions">';
		fileContent += this.fetchStepsFromFile(file_name, step_type);
		fileContent += '</select>';
		return fileContent;
	}

	// Gets All steps from all files
	getAllStepsFromFiles(){
		let fileContent = '<select multiple id="chooseStepDefinitions">';
		let fileExists = nodedir.files('./step_definitions', {sync:true});
		fileContent += this.fetchSteps(fileExists, 'Given');
		fileContent += this.fetchSteps(fileExists, 'When');
		fileContent += this.fetchSteps(fileExists, 'Then');
		fileContent += '</select>';
		return fileContent;
	}

	/**
	 * Gets specific steps from all files
	 * @param {String} step_type - steptype(example:  When/Then/AND)
	 */
	getSpecificStepsFromFiles(step_type){
		let fileContent = '<select multiple id="chooseStepDefinitions">';
		let fileExists = nodedir.files('./step_definitions', {sync:true});
		fileContent += this.fetchSteps(fileExists, step_type);
		fileContent += '</select>';
		return fileContent;
	}

	/**
	 * Fetches steps from step definitions files
	 * @param {Array} file_exists - List of stepdefinition files 
	 * @param {String} step_type - steptype(example:  When/Then/AND)
	 */
	fetchSteps(file_exists, step_type){
		let typeFilesContent = '';
		let that = this;
		file_exists.forEach(function(filename){
			typeFilesContent += that.fetchStepsFromFile(filename, step_type);
		});
		return typeFilesContent;
	}

	/**
	 * Fetches steps from a step definitions file
	 * @param {String} file_name - Name of the file
	 * @param {String} step_type - steptype(example:  When/Then/AND)
	 */
	fetchStepsFromFile(filename, step_type){
		let typeFileContent = '';
		let fetchFileContent = fs.readFileSync(filename, 'utf-8');
		let stepRegExp = new RegExp(step_type+'\\(\/\\^(.*)\\$\/.*\\)','g');
		let functionRegExp = new RegExp('function.*\\((.*)\\)','g');
		let stepOptions = '';
		let matched, matchCount;
		if(fetchFileContent.match(stepRegExp)){
			matchCount = fetchFileContent.match(stepRegExp).length;
		}
		do {
			matched = stepRegExp.exec(fetchFileContent);
			if(matched) {
				let functionParam;
				let functionParamSplit;
				functionParam = functionRegExp.exec(matched[0]);
				if(functionParam){
					functionParamSplit = functionParam[1].split(',');
				}
				stepsCounter++;
				stepOptions += '<option value=\'gen-step-' + stepsCounter + '\'>' + step_type + ' ' + matched[1] + functionParamSplit + '</option>';
				matchCount--;
			}
		} while (matchCount > 0);
		typeFileContent += stepOptions;
		return typeFileContent;
	}

	//Creates/updates feature file
	/**
	 * 
	 * @param {String} file_path - Path to store the feature file
	 * @param {Array} feature_array - Feature file array list.
	 */
	createFeatureFile(file_path, feature_array) {
		let feature_writer = fs.createWriteStream(file_path, { flags: 'a' });
		let splitFeatureArray = feature_array.split(',')
		let arrayCount = splitFeatureArray.length;
		for(let i=0;i<arrayCount;i++){
			feature_writer.write(splitFeatureArray[i]);
			feature_writer.write('\n');
		}
		feature_writer.end();
		let newPath = file_path.replace(/\.[^\.]+$/, '.feature');
        fs.rename(file_path, newPath);
        return "File created!";
	}

	/**
	 * Creates folder under Feature folder
	 * @param {String} folder_name - Name of the folder tro be created.
	 */
	createFeatureFolder(folder_name){
		if(!fs.existsSync('./features/'+folder_name)){
		  fs.mkdirSync('./features/'+folder_name); 
		}
		if(fs.existsSync('./features/'+folder_name)){
			return "Folder created";
		}
	}
}

export default new FeatureGeneratorFunctions()