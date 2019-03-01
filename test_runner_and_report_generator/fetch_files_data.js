import fs from 'fs';
import join from 'path';
import child_process from 'child_process';

let source = './features';
class RunReportgenerator {
    // Method to get check whether the source given is a directory
    isDirectory() {
        return fs.lstatSync(source).isDirectory();
    }

    // Method to get the directory name
    getDirectoriesname(){
        return fs.readdirSync(source);
    }

    // Method to get the directory name with path
    getDirectoriesnamewithpath() {
        return fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory);
    }
    
    // Get the workflow list select drop down to the route '/workflow'
    getworkflow() {
        let fileContent = '<label>WorkFlow Name </label>'+ '<select id="workflow_list_item">';
        fileContent+='<option value=""></option>';
        this.getDirectoriesname().forEach(function(dirname){
            fileContent+='<option value="' + dirname +'">'+dirname+'</option>';
        })
        fileContent += '</select>'
        return fileContent
    }

    /**
     * Get the selected work flow feature file list content to the route '/workflow_feature'
     * @param  {String} dirname - Name of the workflow
    */
    getfeaturefilelist(dirname){
        let folder_path = source + '/' + dirname
        let fileContent = '<select  multiple="multiple" id="lstBox1" class="form-control">';
        fs.readdirSync(folder_path).forEach(function(filename) {
            fileContent+='<option value="' + filename +'">'+filename+'</option>';
        })
        fileContent += '</select>'
        return fileContent
    }

    /**
     * Method to generate the config file to run the selected feature file
     * @param {String} feature - path with feature file name
     * @param {String} workflow - Name of the workflow
     */
    getconfigfiletorun(feature, workflow){
        let run_file = source + '/' + workflow + '/' + feature;
        this.deleteconffile();
        fs.readFile('./config/base_conf.js', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            let result = data.replace('testtoberun', run_file);
            fs.writeFile('./config/run_conf.js', result, 'utf8', function (err) {
                if (err) return console.log(err);
            })
        })
        this.runtest();
    }

    // Method to delete the config file if already present
    deleteconffile(){
        let remove_file ='./config/run_conf.js';
        if (fs.existsSync(remove_file)) {
            fs.unlinkSync(remove_file, function(err){
                console.log(remove_file + 'was not deleted');  
            })
        }
        this.cleanreports();
    }

    // Method to clean the reports
    cleanreports(){
        let dirs_to_clean = ['./reports/allure-results', './reports/html-results'];
        dirs_to_clean.forEach(function(dir_clean){
            fs.readdirSync(dir_clean).forEach(function(filename) {
                let delete_file = dir_clean + '/' + filename;
                fs.unlinkSync(delete_file, function(err){
                    console.log(filename + 'was not deleted');  
                })
            })
        })
    }

    // Method to get the html report name and pass to the route 'html_result'
    gethtmlreportfilename(){
        let file_name = fs.readdirSync('./reports/html-results');
        return file_name;
    }

    // Method to get the allure report
    getallurereport(){
        child_process.exec('cmd /c start "" cmd /c allure_gen.bat', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
          });
    }

    // Method to run and Test
    runtest(){
        child_process.exec('cmd /c start "" cmd /c test_run.bat', (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
          });
    }

}
export default new RunReportgenerator();