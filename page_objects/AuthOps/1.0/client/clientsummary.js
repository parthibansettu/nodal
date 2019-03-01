import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import { debug } from 'util';

class ClientSummaryPage extends Page {

    // ClientSummary Page webelements
    get quickViewTitle() { return browser.element('div.reskinpagetitle'); }
    get addNewInsurance() { return browser.element('a=add new');}

    // Method Waits for the ClientSummary page to be loaded.
    client_summary_page_loaded() {
        Action.waitForJSReadystate();
        Action.setFrMainFrame();
        Action.waitForPageToLoad(this.quickViewTitle, "Client Summary Page");
    }
    create_new_insurance() {
        Action.waitForJSReadystate();
        this.addNewInsurance.click();
        Action.waitForJSReadystate();
        Action.setFrMainFrame();
    }

}
export default new ClientSummaryPage()