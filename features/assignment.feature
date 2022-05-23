Feature: LeapXpert Assignment

  Scenario: Log in Web Application then Request the QR code to access the Mobile application
    Given I go to Web Admin page
      And I login into Web Admin page with company name is "auto_testing" and account username "automation_auto_2021" and password "Testing@123"
      And I fill "111111" to OTP code field
    When I am on Homepage
      And I click avatar icon to go my profile page
      And I click "Devices" tab in my profile page
      And I can see Device tab in my profile page
      And I click "Link Device" button in Device tab
      And I can see QR code is displayed correctly
    When I install the app on my mobile phone
      And I am on Tutorial screen
      And I click Skip button
      And I can see QR code field in Login Screen
      And I fill QR code in fields on login screen
      And I wait until the login form is appeared on login screen
      And I fill "Testing@123" to password field
      And I click the Login button
      And I fill security code "111111" to Security Code fields
      And I wait to see Profile menu at the bottom
      And I tap Contact menu at the bottom
      And I search the account "automation_auto_2022" in the searc bar
      And I select the "Team" tab to see the account
      And I click the account to go detail account screen
      And I tap Chats button in the detail account screen
      And I can see chat screen is opened
      And I send message to AM2 with content "Hi AM2"
      And I reply message for AM2 with content "reply this message"
    Then I go to Web Admin page and logout current user
      And I login into Web Admin page with company name is "auto_testing" and account username "automation_auto_2022" and password "Testing@123"
      And I continue fill "111111" to OTP code field
      And I am on Homepage with AM2
      And I find chat with "automation_auto_2021"
      And I can see message of user 1 "Hi AM2" is displayed correctly




