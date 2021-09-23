Feature: ToDo list


    Scenario: Add the first item to the TODO list
        Given Empty ToDo list
        When I write "buy some milk" to <textbox> and press <enter>
        Then I should see "buy some milk" item in ToDo list

    Scenario: Add the second item to the TODO list below the first item
        Given ToDo list with "buy some milk" item
        When I write "enjoy the assignment" to <textbox> and press <enter>
        Then I should see "enjoy the assignment" item insterted to ToDo list below "buy some milk" item

    Scenario: Mark item as DONE
        Given ToDo list with "buy some milk" item
        When I click on <checkbox> next to "buy some milk" item
        Then I should see "buy some milk" item marked as DONE

    Scenario: Mark item as UNDONE
        Given ToDo list with marked item
        When I click on <checkbox> next to "buy some milk" item
        Then I should see "buy some milk" item marked as UNDONE

    Scenario: Emptying the list
        Given ToDo list with "rest for a while" item
        When I click on <delete button> next to "rest for a while" item
        Then List should be empty

    Scenario: Deleting the second item in the ToDo list
        Given ToDo list with "rest for a while" and "drink water" item in order
        When I click on <delete button> next to "rest for a while" item
        Then I should see "drink water" item in ToDo list