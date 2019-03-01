import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import { patientName } from '../coordinatoradmin/worklist'
import yamlParser from '../../../../utilities/yaml_parser';

class RequisitionPage extends Page {

    // Requisition Page webelements
    get patientName() { return browser.element('.patientNameSpan'); }
    get requisitionId() { return browser.element('.coordinatorOpsSummarySection'); }

    // Method Waits for the Requisition page to be loaded.
    requisition_page_loaded() {
      Action.waitForJSReadystate();
      Action.waitForPageToLoad(this.patientName, "Requisition Page");
      this.patientName.getText().includes(patientName);
    }

    // Method to fetch the requisition id
    fetch_requisition_id(){
      let requisition_id = this.requisitionId.getText().split("\n")[0].match(/Req: (\d{1,}H\d{1,})/)[1];
      global.fetched_requisition_id = requisition_id;
      global.patient_name = patientName;
      yamlParser.append_to_yaml(yamlFileName, ':requisition_id', requisition_id);
      yamlParser.append_to_yaml(yamlFileName, ':patient_name', patientName);
    }

}

export default new RequisitionPage()
