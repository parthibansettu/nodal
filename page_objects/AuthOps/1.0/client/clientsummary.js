import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import { debug } from 'util';

class ClientSummaryPage extends Page {

    // ClientSummary Page webelements
    get quickViewTitle() { return browser.element('div.reskinpagetitle'); }
    get addNewInsurance() { return browser.element('a=add new');}


    //Patient action bar elements
    get clinicals() { return browser.element('//*[@id="ActionMenu_Clinicals_span"]'); }
    get chart() { return browser.element('//*[@id="ActionMenu_Clinicals"]/div[1]'); }

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

    //Method to  navigate chart page through patient action bar
    navigate_chart_via_patient_action_bar() {
        Action.setFrMainFrame();
        this.clinicals.click();
        Action.waitForPageToLoad(this.chart, "1000");
        this.chart.click();
    }

}
export default new ClientSummaryPage()