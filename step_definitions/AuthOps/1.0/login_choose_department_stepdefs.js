import { Given, When, Then } from 'cucumber';
import departmentPage from '../../../page_objects/AuthOps/1.0/login/choose_department';

// Step Definition file specific to Department page
When(/^I choose department and navigate to Dashboard page$/, function() {
  departmentPage.chooseDepartment();
  departmentPage.navigate_to_dashboard_page();
});
