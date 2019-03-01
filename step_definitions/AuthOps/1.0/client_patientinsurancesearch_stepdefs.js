import { Given, When, Then } from 'cucumber';
import patientInsurancSearchePage from '../../../page_objects/AuthOps/1.0/client/patientinsurancesearch.js';

// Step Definition file specific to Patient Insurance Search Page
Then(/^Search Standard Insurance and Navigate to Patient Insurance Page$/, function() {
    patientInsurancSearchePage.create_standard_insurance();
    patientInsurancSearchePage.insurance_search_page_loaded();
    patientInsurancSearchePage.navigate_to_patient_insurance_page();
  });