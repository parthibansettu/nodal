import { Given, When, Then } from 'cucumber';
import patientInsurancPage from '../../../page_objects/AuthOps/1.0/client/patientinsurance.js';

// Step Definition file specific to Patient Insurance Page
Then(/^Enter Insurance Information and Add Insurance$/, function() {
    patientInsurancPage.navigate_to_client_summary_page_via_add_policy();
});