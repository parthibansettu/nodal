import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
import { payer } from '../authops_agent/worklist_home'

class TaskPage extends Page {

    // Task Page webelements
    get serviceUnavailableModal() { return browser.element('.fe_c_modal__dialog.fe_c_modal__dialog--small'); }
    get preCertTaskTitle()   { return browser.element('h1*=Pre-certification'); }
    get taskHeader() { return browser.elements('.patient_banner_component_data_item'); }
    get insuranceHeader() { return browser.element('.insurance_contact_component'); }
    get insurancePrimary() { return this.insuranceHeader.element('h1'); }
    get authorizationResults() { return browser.element('.authorization_results_component'); }
    get applyToCPTCode() { return browser.element('//div[contains(@class, "cpt_codes")]'); }
    get authorizationStatus() { return browser.element('#authStatus'); }
    get authorizationNumber() { return browser.element('#authorizationNumber'); }
    get effectiveDateFrom() { return browser.element('#effectiveDateFrom'); }
    get effectiveDateTo() { return browser.element('#effectiveDateTo'); }
    get certificationLength() { return browser.element('#certificationLength'); }
    get certificationUnit() { return browser.element('#certificationUnit'); }
    get caseNumber() { return browser.element('#caseNumber'); }
    get callReferenceNumber() { return browser.element('#callReferenceNumber'); }
	get additionalNotes() { return browser.element('#additionalNotes'); }
	get saveAll() { return browser.element('button=Save All'); }
	get saveAndSubmit() { return browser.element('button=Save and Submit'); }

	// Method waits for the task page to be loaded.
	task_page_loaded(){
		Action.waitForPageToLoad(this.preCertTaskTitle, "Task Page");
		Action.hasElementText(this.taskHeader.value[0], "Patient Name", patient_name);
		Action.hasElementText(this.insurancePrimary, "Payer", payer);
	}

	// Method to validate primary insurance authorization results
	validate_primary_insurance_authorization_results(){
		Action.waitForElementToLoad(this.authorizationResults, 3);
		Action.isElementVisible(this.applyToCPTCode, "Apply to CPT Code");
		Action.isElementVisible(this.authorizationStatus, "Authorization Status");
		Action.isElementVisible(this.authorizationNumber, "Authorization Number");
		Action.isElementVisible(this.effectiveDateFrom, "Effective Date - From");
		Action.isElementVisible(this.effectiveDateTo, "Effective Date - To");
		Action.isElementVisible(this.certificationLength, "Certification Length");
		Action.isElementVisible(this.certificationUnit, "Certification Unit");
		Action.isElementVisible(this.caseNumber, "Case Number");
		Action.isElementVisible(this.callReferenceNumber, "Call Reference Number");
		Action.isElementVisible(this.additionalNotes, "Additional Notes");
		Action.isElementVisible(this.saveAll, "Save all");
		Action.isElementVisible(this.saveAndSubmit, "Save and Submit");
	}
}

export default new TaskPage()