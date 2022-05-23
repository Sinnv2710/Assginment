import BasePage from '../BasePage';
const { I } = inject();
const SKIP_BUTTON =
	'//android.widget.TextView[@content-desc="activation.skip"]';
const WELCOME_TEXT =
	'//android.widget.TextView[@content-desc="activation.welcome_title"]';
const LIST_OTP_FIELD = '//android.widget.EditText["activation"]';
const PASSWORD_FIELD =
	'//android.widget.EditText[@content-desc="login_password"]';
const LOGIN_BUTTON = '//android.view.ViewGroup[@content-desc="login_signIn"]';
const SECURITY_CODE_SCREEN =
	'//android.widget.TextView[@content-desc="auth.otp_header"]';
const AVATAR_PROFILE_MENU =
	'//android.view.ViewGroup[@content-desc="bottomTab_settings"]';
const CONTACT_MENU =
	'//android.view.ViewGroup[@content-desc="bottomTab_contact"]';
const SEARCH_BAR = '//android.widget.EditText[@content-desc="contact_search"]';
const PROSPECTS_TAB = '//android.widget.TextView[@content-desc="chat.nvc"]';
const CLIENTS_TAB = '//android.widget.TextView[@content-desc="chat.clients"]';
const TEAM_TAB = '//android.view.ViewGroup[@content-desc="tab_teams"]';
const RESULT_TAB =
	'//android.view.ViewGroup[@content-desc="teams_0_0"]/android.view.ViewGroup[2]';
const CONTACT_DETAIL =
	'//android.widget.TextView[@content-desc="chat.contact_profile"]';
const CHAT_BUTTON = '//android.view.ViewGroup[@content-desc="profile_chat"]';
const CHAT_SCREEN = '//android.widget.TextView[@content-desc="send_to_room"]';

export default class LoginScreen extends BasePage {
	constructor(I: CodeceptJS.I) {
		super(I);
	}

	async isAppInstalled() {
		I.switchHelper('Appium');
		await I.seeAppIsInstalled('com.leapxpert.manager.qa');
	}

	async amOnTutorialScreen() {
		const element = locate(WELCOME_TEXT);
		await I.waitForElement(element, 5);
	}

	async clickSkipButton() {
		await I.seeElement(SKIP_BUTTON, 5);
		await I.tap(SKIP_BUTTON, 5);
	}

	async canSeeOTPField() {
		await I.seeElement(LIST_OTP_FIELD);
		const fieldCount: number = await I.grabNumberOfVisibleElements(
			LIST_OTP_FIELD,
		);
		await I.assertAbove(fieldCount, 0, 'OTP field is not visible');
	}

	async fillQRcode(code: string) {
		const codeArray: string[] = Array.from(code);
		for (let i = 0; i < codeArray.length; i++) {
			await I.fillField(
				{ xpath: `//android.widget.EditText[@content-desc="activation_${i}"]` },
				codeArray[i],
			);
		}
	}

	async waitToLoginForm() {
		await I.waitForElement(PASSWORD_FIELD, 10);
	}

	async fillPassword(password: string) {
		await I.seeElement(PASSWORD_FIELD);
		await I.fillField(PASSWORD_FIELD, password);
	}

	async clickLoginButton() {
		await I.waitForElement(LOGIN_BUTTON, 10);
		await I.tap(LOGIN_BUTTON);
		await I.waitForElement(SECURITY_CODE_SCREEN, 10);
	}

	async fillSecurityCode(securityCode: string) {
		const codeArray: string[] = Array.from(securityCode);
		for (let i = 0; i < codeArray.length; i++) {
			await I.fillField(
				{ xpath: `//android.widget.EditText[@content-desc="otp_${i}"]` },
				codeArray[i],
			);
		}
	}

	async waitToSeeProfileMenu() {
		await I.waitForElement(AVATAR_PROFILE_MENU, 20);
	}

	async chooseContactTab() {
		await I.waitForElement(CONTACT_MENU, 10);
		await I.tap(CONTACT_MENU);
	}

	async searchAccount(account: string) {
		await I.waitForElement(SEARCH_BAR, 10);
		await I.tap(SEARCH_BAR);
		await I.fillField(SEARCH_BAR, account);
	}

	async selectTab(tab: string) {
		switch (tab) {
			case 'Prospects':
				await I.waitForElement(PROSPECTS_TAB, 10);
				await I.tap(PROSPECTS_TAB);
				break;
			case 'Clients':
				await I.waitForElement(CLIENTS_TAB, 10);
				await I.tap(CLIENTS_TAB);
				break;
			case 'Team':
				await I.waitForElement(TEAM_TAB, 10);
				await I.tap(TEAM_TAB);
				break;
			default:
				break;
		}
		await I.waitForElement(RESULT_TAB, 10);
	}

	async selectAccount() {
		await I.waitForElement(RESULT_TAB, 10);
		I.wait(2);
		await I.tap(
			`//android.widget.ScrollView/android.view.ViewGroup[1]/android.view.ViewGroup[3]`,
		);
		await I.tap(RESULT_TAB);

		await I.waitForElement(CONTACT_DETAIL, 10);
	}

	async tapChatButton() {
		await I.waitForElement(CHAT_BUTTON, 10);
		await I.tap(CHAT_BUTTON);
	}

	async canSeeChatScreen() {
		await I.waitForElement(CHAT_SCREEN, 10);
	}

	async sendMessage(messageContent: string) {
		await I.waitForElement(CHAT_SCREEN, 10);
		await I.tap(CHAT_SCREEN);
		const elementInput = `//android.widget.EditText[@content-desc="chatDetail_input"]`;
		await I.fillField(elementInput, messageContent);
		const sendMessageBtn = `//android.view.ViewGroup[@content-desc="chatDetail_sendMessage"]`;
		await I.tap(sendMessageBtn);
	}

	async replyMessage(oldMessageContent: string, newMessageContent: string) {
		const element = `//android.widget.TextView[@content-desc="${oldMessageContent}"]`;
		await I.waitForElement(element, 10);

		const value = await I.grabElementBoundingRect(element);
		const sourceX = parseInt(value['x']) + parseInt(value['width']) / 2;
		const sourceY = parseInt(value['y']) + parseInt(value['height']) / 2;

		await I.touchPerform([
			{
				action: 'longPress',
				options: {
					x: sourceX,
					y: sourceY,
				},
			},
			{ action: 'release' },
		]);

		const replyElement = `//android.view.ViewGroup[@content-desc="reply"]`;
		await I.waitForElement(replyElement, 10);
		await I.tap(replyElement);

		const replyMessageModal = `//android.widget.TextView[@content-desc="automation_auto_2021 automation_auto_2021"]`;
		await I.waitForElement(replyMessageModal, 10);
		const elementInput = `//android.widget.EditText[@content-desc="chatDetail_input"]`;
		await I.fillField(elementInput, newMessageContent);
		const sendMessageBtn = `//android.view.ViewGroup[@content-desc="chatDetail_sendMessage"]`;
		await I.tap(sendMessageBtn);
	}
}
