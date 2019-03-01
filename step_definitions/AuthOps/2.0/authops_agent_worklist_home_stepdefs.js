import { Given, When, Then } from 'cucumber';
import worklistPage from '../../../page_objects/AuthOps/2.0/authops_agent/worklist_home';

// Step Definition file specific to worklist page
Given(/^I am on the authorization worklist page$/, function() {
  worklistPage.open();
});

When(/^I search with requisition id and start the task$/, function() {
	//worklistPage.enterRequisition(fetched_requisition_id);
	//worklistPage.startTask(patient_name);
	worklistPage.enterRequisition("7657837H1323");
	worklistPage.startTask("SOTIR, DAWN D");
});

Then(/^I close the AuthWorklist browser$/, function(){
  worklistPage.closeBrowser();
});
