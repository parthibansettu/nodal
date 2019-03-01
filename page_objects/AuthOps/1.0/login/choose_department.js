import Page from '../../../page'
import Action from '../../../../utilities/web_action_methods'

class ChooseDepartmentPage extends Page {

    // Department Page webelements
    get loginButton()     { return browser.element('#loginbutton'); }
    get DepartmentDropdown() { return browser.element('#DEPARTMENTID'); }

    /**
     * Method to choose the department
     * @param {String} department - Department name
     */
    chooseDepartment(department) {
      Action.waitForJSReadystate();
      Action.waitForPageToLoad(this.DepartmentDropdown, "Department Page");
      Action.selectDropdown(this.DepartmentDropdown, "Department", DataYaml[':basedata'][':department_name'], "VisibleText");
    }

    // Method to navigate to the dash board page
    navigate_to_dashboard_page() {
      this.loginButton.click();
      Action.waitForJSReadystate(); 
    }
}

export default new ChooseDepartmentPage()
