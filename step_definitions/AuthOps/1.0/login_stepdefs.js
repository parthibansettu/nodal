import { Given, When, Then } from 'cucumber';
import loginPage from '../../../page_objects/AuthOps/1.0/login';
import yamlParser from '../../../utilities/yaml_parser';

// Step Definition file specific to login page
Given(/^I get the user data from yml "([^"]*)"$/, function(file_name) {
    yamlParser.parse_yaml(file_name);
    global.yamlFileName = file_name;
});

When(/^I login into AthenaNet, enter practice and navigate to department page$/, function() {
  loginPage.open();
  loginPage.login();
  loginPage.navigate_to_practice_page();
  loginPage.enterPracticeid();
  loginPage.navigate_to_department_page();
});

Then(/^I close the Athenanet browser$/, function(){
  loginPage.closeBrowser();
});
