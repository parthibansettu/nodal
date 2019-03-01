import fs from 'graceful-fs';
import dateTime from 'date-time';

class WebActionMethods {
    /**
     * Method Waits for page to load
     * @param {Object} uniqElemIdentifier - unique webelemnt of a paticular page 
     * @param {String} pageName - name of the page
     */
    waitForPageToLoad(uniqElemIdentifier, pageName) {
        try {
          if(!uniqElemIdentifier.isVisible()){
            uniqElemIdentifier.waitForVisible(10000);
          }
          if(uniqElemIdentifier.isVisible()){
            this.logResult(pageName + ' is loaded', 'Pass', dateTime());
          }
          else {
            this.logResult(pageName + ' is not loaded', 'Fail', dateTime());
          }
          }
        catch(err) {
            this.checkForModalPopup();
            global.abortTest = true;
        }
    }

    /**
     * Waits until all the elements are loaded on the page.
     * @param {Integer} timeOut - time in milliseconds
     */
    waitForJSReadystate(timeOut=5000) {
        browser.waitUntil(function() { return browser.execute('return document.readyState').value === 'complete'},timeOut );
    }

    /**
     * Method Waits for element to load
     * @param {Object} elemIdentifier - webelement
     * @param {Integer} timeOut - time in milliseconds
     */
    waitForElementToLoad(elemIdentifier, timeOut) {
        try{
        	if(!elemIdentifier.isVisible()){
        		elemIdentifier.waitForVisible(timeOut * 1000);
        	}
        }
        catch(err) {
            this.logResult(err, 'Warning', dateTime());
        }
    }

    /**
     * Web Action Method to fill the text box field and log the result
     * @param {Object} inputElem - webelement
     * @param {String} elemName - Name of the webelement
     * @param {String} inputValue - Value that to be filled in the text box.
     */
    setValueInTextBox(inputElem, elemName, inputValue){
        this.waitForElementToLoad(inputElem, 3);
        if(inputElem.isVisible()){
            inputElem.setValue(inputValue);
            this.logResult(inputValue + ' is entered in ' + elemName, 'Pass', dateTime());
        }
        else{
            this.logResult(elemName + ' is not Visible, so did not enter ' + inputValue, 'Fail', dateTime()); 
        }
    }

    /**
     * Web Action Method to select the desired radio button and log the result
     * @param {Object} inputElem - webelement
     * @param {String} elemName - Name of the webelement
     * @param {String} inputValue - Radio button otion value that needs to be selected.
     */
    selectRadioButton(inputElem, elemName, inputValue){
        this.waitForElementToLoad(inputElem, 3);
        if(inputElem.isVisible()){
            inputElem.click();
            this.logResult(inputValue + ' option is selected for ' + elemName, 'Pass', dateTime());
        }
        else{
            this.logResult(inputValue + ' is not Visible, so did not select ' + elemName, 'Fail', dateTime()); 
        }
    }

    /**
     * Web Action Method to select the desired option from the select drop down and log the result
     * @param {Object} selectElem - webelement
     * @param {String} elemName - Name of the webelement
     * @param {String} selectOption - Option to be selected
     * @param {String} selectMethod - select method(example: 'VisibleText')
     */
    selectDropdown(selectElem, elemName, selectOption, selectMethod){
        this.waitForElementToLoad(selectElem, 3);
        if(selectElem.isVisible()){
            switch(selectMethod){
                case 'VisibleText':
                    selectElem.selectByVisibleText(selectOption);
                    break;
            }
            this.logResult(selectOption + ' is selected in ' + elemName, 'Pass', dateTime());
        }
        else{
            this.logResult(elemName + ' is not Visible, so did not select ' + selectOption, 'Fail', dateTime()); 
        }
    }

    /**
     * Web Action Method to validate a text and log the result
     * @param {Object} elemIdentifier - webelement
     * @param {String} elemName - Name of the webelement
     * @param {String} textValidate - Text to be validated.
     */
    hasElementText(elemIdentifier, elemName, textValidate){
        this.waitForElementToLoad(elemIdentifier, 3);
        if(elemIdentifier.isVisible()){
            if(elemIdentifier.getText().indexOf(textValidate) > 0){
                this.logResult(textValidate + ' is displayed in ' + elemName, 'Pass', dateTime());    
            }
            else{
                this.logResult(textValidate + ' is not displayed in ' + elemName, 'Fail', dateTime());    
            }            
        }
        else{
            this.logResult(elemName + ' is not Visible, so did not validate ' + textValidate, 'Fail', dateTime()); 
        }
    }

    /**
     * Web Action Method to check element is visible or not and log the result
     * @param {Object} elemIdentifier - webelement
     * @param {String} elemName - Name of the webelement
     */
    isElementVisible(elemIdentifier, elemName){
        this.waitForElementToLoad(elemIdentifier, 3);
        if(elemIdentifier.isVisible()){
            this.logResult(elemName + ' is visible', 'Pass', dateTime());   
        }
        else{
            this.logResult(elemName + ' is not visible', 'Fail', dateTime()); 
        }
    }

    /**
     * Method to log the result
     * @param {String} message - The log message.
     * @param {String} status - Pass or Fail or Done the reults status
     * @param {String} time - Time in milliseconds
     */
    logResult(message, status, time){
        let logMessage;
        switch(status){
            case 'Pass':
                logMessage = '<tr><td>' + message + '</td><td><font color=\'green\'>' + status + '</font></td><td align="centre">' + time + '</td></tr>';
                break;
            case 'Fail':
                logMessage = '<tr><td>' + message + '</td><td><font color=\'red\'>' + status + '</font></td><td align="centre">' + time + '</td></tr>';
                break;
            case 'Done':
                logMessage = '<tr><td>' + message + '</td><td><font color=\'yellow\'>' + status + '</font></td><td align="centre">' + time + '</td></tr>';
                break;
            case 'Warning':
                logMessage = '<tr><td>' + message + '</td><td><font color=\'orange\'>' + status + '</font></td><td align="centre">' + time + '</td></tr>';
                break;                
        }
        
        if (fs.existsSync(filePath)) {
            fs.appendFile(filePath, logMessage);
        }             
    }

    /**
     * Web Action Method to get the text of the element passed.
     * @param {Object} elemIdentifier - Webelement
     * @param {String} elemName - Name of the element
     */
    getTextFromElement(elemIdentifier, elemName){
        try{
            if(elemIdentifier.isExisting()){
                return elemIdentifier.getText();
            }
            else {
                this.logResult(elemName + ' is not existing. So cannot get text.', 'Warning', dateTime());
            }
        }
        catch(err){
            console.log('Inside err');
            this.logResult(err.message, 'Warning', dateTime());
        }
    }

    // Method to check ofr modal popup and click it
    checkForModalPopup(){
        if(browser.element('.fe_c_modal__dialog.fe_c_modal__dialog--small').isVisible()){
            if(browser.element('.fe_c_modal__header').getText() == 'Service is unavailable'){
            this.logResult('Service unavailable modal visible', 'Warning', dateTime());
            browser.element('.fe_c_button.fe_c_button--primary').click();
            }
        }
    }

    // Method to reset the frame to the default content
    resetFrames(){
        browser.frame();
    }

    // Method to set the frame to GlobalNavFrame
    setGlobalNavFrame(){
        this.resetFrames();
        browser.frame(browser.element('//iframe[@id="GlobalNav"]').value);
    }

    // Method to set the frame to GlobalWrapperFrame
    setGlobalWrapperFrame(){
        this.resetFrames();
        browser.frame(browser.element('//iframe[@id="GlobalWrapper"]').value);
    }

    // Method to set the frame to FrameContentFrame
    setFrameContentFrame(){
        this.setGlobalWrapperFrame();
        browser.frame(browser.elements("frameset").value[0].elements("frame").value[2]);
    }

    // Method to set the frame to FrMainFrame
    setFrMainFrame(){
        this.setFrameContentFrame();
        browser.frame(browser.elements("div").value[6].elements("iframe").value[0]);
    }

    // Method to set the frame to FrScheduleNavFrame
    setFrScheduleNavFrame(){
        this.setFrameContentFrame();
        browser.frame(browser.elements("div").value[3].elements("iframe").value[0]);
    }
}
export default new WebActionMethods()