import { Controller } from '../pages/Controller';
const controller = new Controller();
const { I } = inject();
let qrCode: string;
let message: string;
Given('I go to Web Admin page', async () => {
	await controller.getLoginPage().goToWebAdminPage();
});

Given(
	'I login into Web Admin page with company name is {string} and account username {string} and password {string}',
	async (company: string, username: string, password: string) => {
		await controller.getLoginPage().login(username, password, company);
	},
);

Given('I fill {string} to OTP code field', async () => {
	await controller.getLoginPage().inputOtpCode();
});

When('I am on Homepage', async () => {
	await controller.getBasePage().switchWebDriver().refreshPage();
	await controller.getHomePage().amOnHomePage();
});

When('I click avatar icon to go my profile page', async () => {
	await controller.getHomePage().goToProfile();
});

When('I click {string} tab in my profile page', async (tab: string) => {
	await controller.getHomePage().clickTab(tab);
});

When('I can see Device tab in my profile page', async () => {
	await controller.getHomePage().verifyDeviceTab();
});

When('I click {string} button in Device tab', async () => {
	await controller.getHomePage().clickLinkDevice();
});

When('I can see QR code is displayed correctly', async () => {
	qrCode = await controller.getHomePage().getQRCode();
});

When('I install the app on my mobile phone', async () => {
	await controller.getBasePage().switchWebDriver().wait(2);
	await controller.getLoginScreen().isAppInstalled();
});

When('I am on Tutorial screen', async () => {
	await controller.getLoginScreen().amOnTutorialScreen();
	await controller.getBasePage().switchWebDriver().wait(2);
});

When('I click Skip button', async () => {
	await controller.getLoginScreen().clickSkipButton();
	await controller.getBasePage().switchWebDriver().wait(2);
});

When('I can see QR code field in Login Screen', async () => {
	await controller.getLoginScreen().canSeeOTPField();
});

When('I fill QR code in fields on login screen', async () => {
	await controller.getLoginScreen().fillQRcode(qrCode);
});

When('I wait until the login form is appeared on login screen', async () => {
	await controller.getLoginScreen().waitToLoginForm();
});

When('I fill {string} to password field', async (password: string) => {
	await controller.getLoginScreen().fillPassword(password);
});

When('I click the Login button', async () => {
	await controller.getLoginScreen().clickLoginButton();
});

When(
	'I fill security code {string} to Security Code fields',
	async (securityCode: string) => {
		await controller.getLoginScreen().fillSecurityCode(securityCode);
		I.wait(2);
	},
);

When('I wait to see Profile menu at the bottom', async () => {
	await controller.getLoginScreen().waitToSeeProfileMenu();
});

When('I tap Contact menu at the bottom', async () => {
	await controller.getLoginScreen().chooseContactTab();
});

When(
	'I search the account {string} in the searc bar',
	async (account: string) => {
		await controller.getLoginScreen().searchAccount(account);
	},
);

When('I select the {string} tab to see the account', async (tab: string) => {
	await controller.getLoginScreen().selectTab(tab);
});

When('I click the account to go detail account screen', async () => {
	await controller.getLoginScreen().selectAccount();
});

When('I tap Chats button in the detail account screen', async () => {
	await controller.getLoginScreen().tapChatButton();
});

When('I can see chat screen is opened', async () => {
	await controller.getLoginScreen().canSeeChatScreen();
});

When('I send message to AM2 with content {string}', async (content: string) => {
	message = content;
	await controller.getLoginScreen().sendMessage(content);
});

When(
	'I reply message for AM2 with content {string}',
	async (content: string) => {
		await controller.getLoginScreen().replyMessage(message, content);
	},
);

Then('I go to Web Admin page and logout current user', async () => {
	await controller.getHomePage().goToWebAdminPage();
	await controller.getHomePage().goToProfile();
	await controller.getHomePage().logout();
});

Then(
	'I login into Web Admin page with company name is "auto_testing" and account username {string} and password {string}',
	async (company: string, username: string, password: string) => {
		await controller.getLoginPage().login(username, password, company);
		pause();
	},
);

Then('I continue fill {string} to OTP code field', async () => {
	await controller.getLoginPage().inputOtpCode();
});

Then('I am on Homepage with AM2', async () => {
	await controller.getHomePage().amOnHomePage();
});

Then('I find chat with {string}', async (account: string) => {
	await controller.getHomePage().findRoomChat(account);
});

Then(
	'I can see message of user 1 {string} is displayed correctly',
	async (chatText: string) => {
		await controller.getHomePage().findChatText(chatText);
	},
);
