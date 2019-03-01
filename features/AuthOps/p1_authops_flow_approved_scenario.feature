Feature: Authops flow for approved scenario

    As a user of Authorization worklist,
    I want to approve the authorization task
    So that order can be completed.


    Scenario Outline: Authops flow for approved scenario
        Given I get the user data from yml <filename>
        When I login into AthenaNet, enter practice and navigate to department page
        Then I choose department and navigate to Dashboard page
        When Dashboard page is loaded
        Then Navigate to the "New Patient Registration" page
        Then Register a new patient
        Then Navigate to Patient Insurance Search Page
        Then Search Standard Insurance and Navigate to Patient Insurance Page
        Then Enter Insurance Information and Add Insurance
        Then Navigate to chart page through patient action bar
        Examples:
        |filename|
        |"././data_set/p1_authops_flow_approved_scenario.yml"|
        
