import { Given, When, Then } from 'cucumber';
import regPage from '../../../page_objects/AuthOps/1.0/client/registration.js';

// Step Definition file specific to Regstration page
Then(/^Register a new patient$/, function() {
  regPage.registration_page_loaded();
  regPage.fill_the_mandatory_fields_for_registration();
  regPage.navigate_to_client_summary_page_via_save_button();
});

