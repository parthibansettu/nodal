import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import dateTime from 'date-time';
let payer = '';

class WorklistHomePage extends Page {

    // Login Page webelements
    get authorizationWorklistTitle()   { return browser.element('h1=Authorization Management Worklist'); }
    get searchRequisition()   { return browser.element('#searchText'); }
    get requisitionTable() { return browser.element('//table[contains(@class, "fe_c_table")]'); }

    // Open Authorization Management worklist
    open () {
        super.open('https://authops-dev.gateway.aws.athenahealth.com/authops-835-agent/worklist');
        browser.pause(8000);
        Action.waitForPageToLoad(this.authorizationWorklistTitle, "Authorization Worklist Page");
        Action.logResult('Browser is opened', 'Pass', dateTime());
    }

    /**
     * Method to enter requisition id
     * @param {String} requistionId - requisition Id to search for
     */
    enterRequisition(requistionId){
      Action.waitForElementToLoad(this.searchRequisition, 3);
      Action.setValueInTextBox(this.searchRequisition, "Search Requisition", requistionId);
      browser.keys('\uE007');
      browser.pause(5000);
    }

    /**
     * Method to start task
     * @param {String} patientName - Patient Name
     */
    startTask(patientName){
      Action.waitForElementToLoad(this.requisitionTable, 3);
      let searchRows = this.requisitionTable.elements("tr").value;
      let searchRowsCount = searchRows.length;
      let patientNameSplit = patientName.split(', ');
      let patientNameModified = patientNameSplit[1] + ' ' + patientNameSplit[0];
      for(let i=1;i<searchRowsCount;i++){
        if(Action.getTextFromElement(searchRows[i].element('td[data-column="patientName"]'), "Patient Name").toUpperCase() == patientNameModified.toUpperCase()){
          payer = Action.getTextFromElement(searchRows[i].element('td[data-column="payer"]'), "Payer");
          searchRows[i].element('td[data-column="assigned"]').element('a=Start task').click();
          break;
        }
      }
    }

    // Method to close the browser
    closeBrowser(){
      Action.logResult('Browser is closed', 'Pass', dateTime());
    }
}

export { payer };

export default new WorklistHomePage()
