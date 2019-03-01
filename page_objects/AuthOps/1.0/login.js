import Page from '../../page'
import Action from '../../../utilities/web_action_methods'
import dateTime from 'date-time';
let testdata;

class LoginPage extends Page {

    // Login Page webelements
    get usernameInput()   { return browser.element('#USERNAME'); }
    get passwordInput()   { return browser.element('#PASSWORD'); }
    get loginButton()     { return browser.element('#loginbutton'); }
    get PracticeId()     { return browser.element('#PRACTICEFINDTEXT'); }

    // Login Page Specific Methods
    open () {
        super.open('https://prodmirror.athenahealth.com');
        browser.pause(3000);
        Action.logResult('Browser is opened', 'Pass', dateTime())
    }

    // Method to login
    login() {
      Action.waitForPageToLoad(this.usernameInput, "Login Page");
      Action.setValueInTextBox(this.usernameInput, "Username", DataYaml[':basedata'][':user_name']);
      Action.setValueInTextBox(this.passwordInput, "Password", DataYaml[':basedata'][':password']);
    }

    // Method to navigate to practice page
    navigate_to_practice_page (){
      this.loginButton.click();
      browser.pause(2000);
    }
    
    /**
     * Method to enter practice id
     * @param {String} practice_id - Practice ID
     */
    enterPracticeid(practice_id){
      Action.waitForJSReadystate();
      Action.waitForPageToLoad(this.PracticeId, "Practice page");
      Action.setValueInTextBox(this.PracticeId, "Practice Id", DataYaml[':basedata'][':practice_id']);
    }

    // Method to navigate to department page
    navigate_to_department_page() {
      this.loginButton.click();
      browser.pause(2000);
    }

    // Method to close the browser
    closeBrowser(){
      Action.logResult('Browser is closed', 'Pass', dateTime());
    }
}

export default new LoginPage()
