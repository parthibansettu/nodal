import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import faker from '../../../../utilities/fake_generator'
import dateTime from 'date-time'

class RegistrationPage extends Page {

    // Registration Page webelements
    get lastName() { return browser.element('input[name="LASTNAME"]'); }
    get firstName() { return browser.element('input[name="FIRSTNAME"]'); }
    get legalSex() { return browser.element('select[name="SEX"]'); }
    get dob() { return browser.element('input[name="DOB"]'); }
    get homePhone() { return browser.element('input[name="HOMEPHONE"]'); }
    get mobilePhone() { return browser.element('input[name="MOBILEPHONE"]'); }
    get consentToText() { return browser.element('#rb_CONSENTTOTEXTRADIO_2'); }
    get patientEmail() { return browser.element('input[name="EMAIL"]'); }
    get usualProvider() { return browser.element('select[name="PRIMARYPROVIDERID"]'); }
    get consentToCall() { return browser.element('#rb_CONSENTTOCALLFLAG_2'); }
    get guarantorRelationship() { return browser.element('#RELATIONSHIPTOPATIENTID'); }
    get savePatient() { return browser.element('input[name="SUBMITVALUE"]'); }

    // Waits for the Registration page to be loaded.
    registration_page_loaded() {
        Action.waitForJSReadystate();
        Action.setFrMainFrame();
        Action.waitForPageToLoad(this.lastname, "Patient Registration Page");
    }

    // Method to fill all the manditory fields in the registration page
    fill_the_mandatory_fields_for_registration(){
        Action.setValueInTextBox(this.lastName,"Last Name",faker.randomString(6));
        Action.setValueInTextBox(this.firstName,"First Name",faker.randomString(6));
        Action.selectDropdown(this.legalSex, "Legal Sex", 'Male', 'VisibleText');
        Action.setValueInTextBox(this.dob, "DOB", 't-20');
        Action.setValueInTextBox(this.homePhone, "Home Phone", faker.randomNumber(10));
        Action.setValueInTextBox(this.mobilePhone, "Mobile Phone", faker.randomNumber(10));
        Action.setValueInTextBox(this.patientEmail, "Patient Email", faker.randomMail());
        Action.selectRadioButton(this.consentToText, "Consent To Text", 'No');
        Action.selectDropdown(this.usualProvider, "Usual Provider", 'Carolan_M', 'VisibleText');
        Action.selectRadioButton(this.consentToCall, "Consent To Call", 'No');
        Action.selectDropdown(this.guarantorRelationship, "Guarantor Relationship", 'Self','VisibleText');
    }

    // Method to navigate to client summary page via save button
    navigate_to_client_summary_page_via_save_button(){
        this.savePatient.click();
        try {
            if (browser.alertText().length != 0){
                browser.alertAccept();
                Action.logResult('Patient registration', 'Pass', dateTime());
            }
        }
        catch(e){
            Action.logResult('Patient registration', 'Pass', dateTime());   
        }
        Action.waitForJSReadystate();
    }
}
export default new RegistrationPage()