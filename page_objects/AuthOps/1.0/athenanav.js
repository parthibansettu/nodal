import Page from '../../page'
import Action from '../../../utilities/web_action_methods'

class AthenaNavPage extends Page {

    // Athena Nav Page webelements
    get Worklist() { return browser.element('a=Worklist'); }
    
    // Method to navigate to the worklist
    navigate_to_worklist(){
        Action.setFrScheduleNavFrame();
        Action.waitForElementToLoad(this.Worklist, 3);
        this.Worklist.click();
        browser.pause(5000);
    }
}

export default new AthenaNavPage()
