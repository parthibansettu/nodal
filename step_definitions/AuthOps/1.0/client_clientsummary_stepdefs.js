import { Given, When, Then } from 'cucumber';
import clientSummaryPage from '../../../page_objects/AuthOps/1.0/client/clientsummary.js';

// Step Definition file specific to Regstration page
Then(/^Navigate to Patient Insurance Search Page$/, function() {
    clientSummaryPage.create_new_insurance();
  });
// step definition for  navigating to chart page through patient action bar   
Then(/^Navigate to chart page through patient action bar$/, function() {
  clientSummaryPage.navigate_chart_via_patient_action_bar();
  browser.debug();
  });
  