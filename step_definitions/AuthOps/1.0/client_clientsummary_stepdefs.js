import { Given, When, Then } from 'cucumber';
import clientSummaryPage from '../../../page_objects/AuthOps/1.0/client/clientsummary.js';

// Step Definition file specific to Regstration page
Then(/^Navigate to Patient Insurance Search Page$/, function() {
    clientSummaryPage.create_new_insurance();
  });
  