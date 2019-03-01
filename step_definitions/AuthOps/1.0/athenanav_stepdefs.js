import { Given, When, Then } from 'cucumber';
import athenaNavPage from '../../../page_objects/AuthOps/1.0/athenanav';

// *** Step Definition file specific to Athenanav page
When(/^I click Worklist link$/, function() {
  athenaNavPage.navigate_to_worklist();
});