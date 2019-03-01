import { Given, When, Then } from 'cucumber';
import dashboardPage from '../../../page_objects/AuthOps/1.0/ax/non_clinician';

// Step Definition file specific to Dashboard page
When(/^Dashboard page is loaded$/, function() {
	dashboardPage.dashboard_page_loaded();
});

Then(/^setting "([^"]*)" is chosen under Settings menu$/, function(menu_item) {
	dashboardPage.click_settings_menu();
	dashboardPage.choose_menu_item(menu_item);
});

Then(/^Navigate to the "([^"]*)" page$/, function(menu_item) {
	dashboardPage.click_patients_menu();
	dashboardPage.choose_menu_item(menu_item);
});
