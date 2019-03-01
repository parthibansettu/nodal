import { Given, When, Then } from 'cucumber';
import taskPage from '../../../page_objects/AuthOps/2.0/authops_agent/task';

// Step Definition file specific to Task page
When(/^task details displayed are of the patient$/, function() {
	taskPage.task_page_loaded();
});

Then(/^I validate Authorization Results section$/, function(){
	taskPage.task_page_loaded();
	taskPage.validate_primary_insurance_authorization_results();
});
