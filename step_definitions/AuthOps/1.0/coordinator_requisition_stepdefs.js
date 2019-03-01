import { Given, When, Then } from 'cucumber';
import requisitionPage from '../../../page_objects/AuthOps/1.0/coordinator/requisition';

// Step Definition file specific to Coordinator Requisitions
When(/^Requisition page is loaded$/, function() {
  requisitionPage.requisition_page_loaded();
});

Then(/^I fetch requisition id from patient$/, function() {
  requisitionPage.fetch_requisition_id();
});