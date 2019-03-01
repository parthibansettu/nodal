import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'

class NonClinicianPage extends Page {

    // Nonclinician Page webelements
	get athenaTextNotification() { return browser.element('#stm-notification-welcome-header'); }
	get athenaTextNotificationClose() { return browser.element('.stm-notification-close icon-streamlined-delete-inline'); }
    get devInfo()   { return browser.element('.dev-info'); }
    get settingsMenu()   { return browser.element('#settingsmenucomponent'); }
    get settingsContainer()   { return browser.element('#settingsmenucontainer'); }
    get patientsMenu()   { return browser.element('#patientsmenucomponent'); }
    get patientsMenuContainer()   { return browser.element('#patientsmenucontainer'); }
    
    // Method waits for the dash board page to be loaded.
    dashboard_page_loaded() {
        Action.waitForJSReadystate();
        Action.setFrMainFrame(); // Sets frMain frame as the base frame
    	if (this.athenaTextNotification.isVisible()) this.athenaTextNotificationClose.click();
    	Action.waitForPageToLoad(this.devInfo, "Dashboard - Non Clinician Page");
    }

    // Method to click the Gear menu
    click_settings_menu(){
        Action.setGlobalNavFrame(); // Sets the GlobalNavFrame as the base frame
    	this.settingsMenu.click();
    	browser.pause(2000);
        Action.resetFrames();
    	Action.waitForElementToLoad(this.settingsContainer, 3);
    }

    /**
     * Method to select the desired menu item from the selected menu
     * @param {String} menu_item - Desired menu item
     */
    choose_menu_item(menu_item){
        this.settingElem = browser.element('div='+menu_item);
    	Action.waitForElementToLoad(this.settingElem, 3);
    	this.settingElem.click();
        browser.pause(5000);
    }

    // Method to click the Patient menu
    click_patients_menu(){
        Action.setGlobalNavFrame();
    	this.patientsMenu.click();
    	browser.pause(2000);
        Action.resetFrames();
    	Action.waitForElementToLoad(this.patientsMenuContainer, 3);
    }
}

export default new NonClinicianPage()
