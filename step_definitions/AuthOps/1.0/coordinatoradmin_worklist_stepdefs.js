import { Given, When, Then } from 'cucumber';
import worklistPage from '../../../page_objects/AuthOps/1.0/coordinatoradmin/worklist';

// Step Definition file specific to Worklist page under Coordinator Admin
Then(/^I choose patient who has pre-cert pending after sorting by DOS$/, function() {
  worklistPage.pre_certification_table_loaded();
  worklistPage.sort_table_choose_patient();
});
