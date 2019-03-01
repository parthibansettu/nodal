const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 20000000) : 9000000;

exports.config = {

    specs: [
        './features/AuthOps/p1_authops_flow_approved_scenario.feature',
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,

    capabilities: [

          {
              browserName: 'chrome'
          },
    ],
    suites: {
        login: [
            'testtoberun',
            'testtoberun',
        ]
    },
    execArgv: ['--inspect'], // Add this to enable debugger and open chrome://inspect - Configure - Add 'localhost:9515' and click 'Open dedicated DevTools for Node'
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    logLevel: 'silent',     // Level of logging verbosity: silent | verbose | command | data | result | error
    coloredLogs: true,      // Enables colors for log output.
    screenshotPath: './reports/errorShots/',   // Saves a screenshot to a given path if a command fails.
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: 'http://localhost:8080',
    waitforTimeout: 9000000,            // Default timeout for all waitFor* commands.
    connectionRetryTimeout: 90000,    // Default timeout in milliseconds for request  if Selenium Grid doesn't send response
    connectionRetryCount: 3,          // Default request retries count
    services: ['chromedriver'],
    port: '9515',
    path: '/',
    framework: 'cucumber',
    reporters: ['spec', 'junit','allure', 'json'],

    reporterOptions: {
        junit:  {outputDir: './reports/junit-results/'},
        json:   {outputDir: './reports/json-results/'},
        allure: {
          outputDir:   './reports/allure-results/',
          disableWebdriverStepsReporting: false,
          useCucumberStepReporter: false,
        },
    },

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./step_definitions/AuthOps/**/*.js'],   // <string[]> (file/dir) require files before executing features
        backtrace: true,    // <boolean> show full backtrace for errors
        compiler: ['js:babel-core/register'], // <string[]> filetype:compiler used for processing required features
        failAmbiguousDefinitions: true,       // <boolean< Treat ambiguous definitions as errors
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        ignoreUndefinedDefinitions: false,    // <boolean> Enable this config to treat undefined definitions as warnings
        name: [],           // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: false,    // <boolean> hide step definition snippets for pending steps
        source: false,      // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: true,       // <boolean> fail if there are any undefined or pending steps
        tagExpression: 'not @Pending',      // <string> (expression) only execute the features or scenarios with tags matching the expression, see https://docs.cucumber.io/tag-expressions/
        timeout: defaultTimeoutInterval,    // <number> timeout for step definitions
        tagsInTitle: false,                 // <boolean> add cucumber tags to feature or scenario name
        snippetSyntax: undefined,           // <string> specify a custom snippet syntax
    },
    before: function(){
        let fs = require('fs');
        let dateTime = require('date-time');
        let sessionId = browser.requestHandler.sessionID;
        global.abortTest = false;
        global.filePath = './reports/html-results/log_' + Date.now() + '.txt';
        fs.open(filePath, 'a', (err,fd) => {});
        fs.writeFile(filePath, '<html><head><style type="text/css">tr:nth-child(even) {background-color:#f2f2f2;} table {border:1px; border-collapse: collapse;}</style></head><body>', function(error){
            if(error) throw error;
        });
        fs.appendFile(filePath, '<p> Test Started at ' + dateTime() + '</p><br />', function(error){
            if(error) throw error;
        });
        browser.addCommand('abortTest', function() {
            this.emit('end', { sessionId: browser.requestHandler.sessionID });
            return browser.requestHandler.create({ path: '/session/' + sessionId, method: 'DELETE', requiresSession: false }).then(function (res) {
                browser.requestHandler.sessionID = null;
                return res;
            });
        });
    },
    beforeFeature: function(feature){
        let fs = require('fs');
        fs.appendFile(filePath, '<p>Feature Title: ' + feature.name + '</p><br /><p>Feature Description: ' + feature.description + '</p><br />', function(error){
            if(error) throw error;
        });
    },
    beforeScenario: function(scenario){
        let fs = require('fs');
        fs.appendFile(filePath, '<p>Scenario Outline: ' + scenario.name + '</p><br /><table align="center" border="1">', function(error){
            if(error) throw error;
        });
    },
    beforeStep: function(step){
        let fs = require('fs');
        fs.appendFile(filePath, '<tr><td colspan="3" align="center"><b>Step: ' + step.name + '</b></td></tr>', function(error){
            if(error) throw error;
        });
    },
    // beforeCommand: function(){
    //     let fs = require('fs');
    //     if(abortTest == true){
    //         let dateTime = require('date-time');
    //         fs.appendFile(filePath, '</table><hr /><p> Test Completed at ' + dateTime() + ' </body></html>', function(error){
    //             if(error) throw error;
    //         });
    //         let newPath = filePath.replace(/\.[^\.]+$/, '.html');
    //         fs.rename(filePath, newPath);
    //         browser.abortTest();
    //         console.log('Aborting test due to unexpected popup or page not loading....');
    //         process.exit(0);
    //     }
    // },
    afterScenario: function(){
        let fs = require('fs');
        fs.appendFile(filePath, '</table>', function(error){
            if(error) throw error;
        });
    },
    afterFeature: function(){
        let fs = require('fs');
        fs.appendFile(filePath, '<hr /><br />', function(error){
            if(error) throw error;
        });
    },
    after: function(){
        let fs = require('fs');
        let dateTime = require('date-time');
        fs.appendFile(filePath, '<p> Test Completed at ' + dateTime() + ' </body></html>', function(error){
            if(error) throw error;
        });
        let newPath = filePath.replace(/\.[^\.]+$/, '.html');
        fs.rename(filePath, newPath);
    }
};
