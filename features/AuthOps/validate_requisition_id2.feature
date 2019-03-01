Feature: Fetch Requisition from Prodmirror

    As a user of Authorization worklist,
    I want to fetch requisition id from prodmirror
    So that I can submit it

    Scenario Outline: Fetch Requisition of patient with pre-certificatin pending from prodmirror, submit it and verify it in authops
        Given I get the user data from yml <filename>
        When I login into AthenaNet, enter practice and navigate to department page
        Then I choose department and navigate to Dashboard page
        #When Dashboard page is loaded
        #Then setting "Coordinator Operations" is chosen under Settings menu
        #When I click Worklist link
        #Then I choose patient who has pre-cert pending after sorting by DOS
        #When Requisition page is loaded
        #Then I fetch requisition id from patient
        #Then I close the Athenanet browser
        #Given I am on the authorization worklist page
        #Then I submit requisition id to authops and verify whether it is successful
        #When I search with requisition id and start the task
        #Then I validate Authorization Results section
        Then I close the AuthWorklist browser

        Examples:
        |filename|
        |"././data_set/validate_requisition_id.yml"|
        
