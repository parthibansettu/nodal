import json2yaml from 'json-to-pretty-yaml';
import yaml from 'js-yaml';
import fs from 'graceful-fs';

class YamlParser {
	/**
	 * Method to safe load the yaml to be parsed.
	 * @param {String} file_name - Yaml file with path
	 */
	load_yaml(file_name){
	    try {
	        let doc = yaml.safeLoad(fs.readFileSync(file_name, 'utf8'));
	        return doc;
	    } catch (e) {
	        console.log(e);
	    }
	}

	/**
	 * Method to append content to an yaml
	 * @param {String} file_name - Yaml file with path
	 * @param {String} yaml_key - key who's value need to changed or append
	 * @param {String} content - Value to be appended
	 */
	append_to_yaml(file_name, yaml_key, content){
		try{
			let doc = yaml.safeLoad(fs.readFileSync(file_name, 'utf8'));
			doc[':basedata'][yaml_key] = content;
			let ymlTxt = json2yaml.stringify(doc);
			let app = yaml.safeLoad(fs.writeFileSync(file_name, ymlTxt));
		}
		catch (e) {
			console.log(e);
		}
	}

	/**
	 * Method to parse the yaml
	 * @param {String} file_name - Yaml file with path
	 */
    parse_yaml(file_name) {
        let testdata = this.load_yaml(file_name);
        global.DataYaml = testdata;
    }
}

export default new YamlParser()
