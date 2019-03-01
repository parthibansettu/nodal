import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'
const rgbHex = require('rgb-hex');
let patientName = '';

class WorklistPage extends Page {

    // Worklist  Page webelements
    get preCertTable() { return browser.element('#urgentprecert-table'); }
    get preCertPagination() { return this.preCertTable.element('.pagination').element('#HEADERCONTROLS'); }
    get thDOS() { return browser.element('//th[contains(@class, "COLUMNSERVICEDATE")]') }

    pre_certification_table_loaded() {
      Action.setFrMainFrame();
      Action.waitForPageToLoad(this.preCertTable, "Worklist Page");
    }

    // Method to sort the table and choose patient
    sort_table_choose_patient(){
      this.thDOS.click();
      browser.pause(5000);
      this.thDOS.click();
      browser.pause(5000);
      let totalPreCertPages = Number(this.preCertPagination.getText().split(' ')[2]);
      for(let r=1;r<totalPreCertPages;r++){
        this.preCertPagination.element('input').setValue(r);
        this.preCertPagination.element('input').keys('\uE007');
        browser.pause(5000);
        let preCertTableRows = browser.element('#urgentprecert-table').elements('tr');
        let tableRows = preCertTableRows.value.length;
        for(let i=2;i<(tableRows-1);i++){
          let preCertRow = preCertTableRows.value[i];
          if(preCertRow.element('.COLUMNTASKTYPE').getText() == "Pre-Certification (Pending)"){
            patientName = preCertRow.element('.COLUMNPATIENTNAME').getText();
            let patientLinkHrefColor = rgbHex(preCertRow.element('.COLUMNPATIENTNAME').element('a=' + patientName).getCssProperty('color').value);
            let patientLinkBlueColor = '006f9dff';
            if(patientLinkHrefColor == patientLinkBlueColor){ //Avoid clicking green color link
              preCertRow.element('.COLUMNPATIENTNAME').element('a=' + patientName).click();
              r = totalPreCertPages; //to break outer loop
              break;
            }
          }
        }
      }
      browser.pause(5000);
      browser.alertAccept();
      browser.pause(10000);
    }
}

export { patientName };

export default new WorklistPage()
