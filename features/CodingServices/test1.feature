Feature: Fetch Requisition from Prodmirror

    As a user of Authorization worklist,
    I want to fetch requisition id from prodmirror
    So that I can submit it

    Scenario Outline: Fetch Requisition of patient with pre-certificatin pending from prodmirror, submit it and verify it in authops
        Given I get the user data from yml <filename>

        Examples:
        |filename|
        |"././data_set/validate_requisition_id.yml"|
