import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import faker from '../../../../utilities/fake_generator'
import { debug } from 'util';

class PatientInsurance extends Page {

    get addInsurance() { return browser.element('input[name="SUBMITVALUE"]');}
    
    navigate_to_client_summary_page_via_add_policy() {
        Action.waitForElementToLoad(this.addInsurance, 5000);
        this.addInsurance.click();

    }


}
export default new PatientInsurance()