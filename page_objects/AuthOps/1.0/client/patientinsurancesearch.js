import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import faker from '../../../../utilities/fake_generator'
import { debug } from 'util';

class PatientInsuranceSearchPage extends Page {

    //get insuranceName() { return browser.element("[class='bootstrap-tagsinput RequiredFieldColor']"); }
    get insuranceName() { return browser.element('//input[contains(@fieldnameforuser, "Insurance Name")]');}
    get memberId() { return browser.element('//input[contains(@fieldnameforuser, "Member ID")]');}
    get searchInsurance() { return browser.element('#findbutton');}
    get selectInsurance() { return browser.element('(//*[@id="selectbox"]/button)[1]')}

    create_standard_insurance() {
        Action.setValueInTextBox(this.insuranceName, "Insurance Name", "BCBS_Ky");
        Action.setValueInTextBox(this.memberId, "Member ID", "ABC"+faker.randomNumber(10));
        this.searchInsurance.click();
    }
    // Waits for the insurance page to be loaded.
    insurance_search_page_loaded() {
        Action.waitForJSReadystate();
        Action.setFrMainFrame();
        Action.waitForElementToLoad(this.selectInsurance, 10000);
    }

    // Navigate to patientInsurance Page
    navigate_to_patient_insurance_page() {
        Action.waitForJSReadystate();
        this.selectInsurance.click();
        Action.waitForJSReadystate();
        Action.setFrMainFrame();
    }
}
export default new PatientInsuranceSearchPage()