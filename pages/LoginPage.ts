import basePage from './BasePage';

export const LOGIN_FORM_LOCATOR = `div[class*='Login_company']`;
export const COMPANY_FIELD = `input[placeholder="Company"]`;
export const LOGIN_BTN = `div[class*=Login_form] span[class*=Login_button]`;
export const LOGIN_USERNAME_FIELD = `input[data-testid="usernameLogin"]`;
export const LOGIN_PASSWORD_FIELD = `input[data-testid='passwordLogin']`;
export const OTP_CONTAINER = `div[class*=OTPInput_container]`;
export const OTP_FIELD = `div[class*=OTPInput_input]`;

const { I } = inject();

export default class LoginPage extends basePage {
	constructor(I: CodeceptJS.I) {
		super(I);
	}

	async amOnLoginPage() {
		await this.goToWebAdminPage();
		const element: CodeceptJS.LocatorOrString =
			locate(LOGIN_FORM_LOCATOR).as('Login form');
		await this.switchWebDriver().waitForVisible(element);
		const elementVisibleCount: number =
			await this.switchWebDriver().grabNumberOfVisibleElements(element);
		await this.switchWebDriver().assertAbove(
			elementVisibleCount,
			0,
			'Login form is not visible',
		);
	}

	async login(username: string, password: string, company: string) {
		await this.inputCompany(company);
		await this.clickNextBtn();
		await this.inputCredentialInLoginForm(username, password);
		await this.clickNextBtn();
	}

	async inputCompany(company: string) {
		const element: CodeceptJS.LocatorOrString =
			locate(COMPANY_FIELD).as('Company field');
		await this.inputText({ locator: element, text: company });
	}

	async clickNextBtn() {
		const element: CodeceptJS.LocatorOrString =
			locate(LOGIN_BTN).as('Next button');
		await this.switchWebDriver().click(element);
	}

	async inputCredentialInLoginForm(username: string, password: string) {
		const usernameElement: CodeceptJS.LocatorOrString =
			locate(LOGIN_USERNAME_FIELD).as('Username field');
		await this.switchWebDriver().waitForElement(usernameElement, 5);
		await this.inputText({ locator: usernameElement, text: username });
		const passwordElement: CodeceptJS.LocatorOrString =
			locate(LOGIN_PASSWORD_FIELD).as('Password field');
		await this.switchWebDriver().waitForElement(passwordElement, 5);
		await this.inputText({ locator: passwordElement, text: password });
	}

	async inputOtpCode() {
		const element: CodeceptJS.LocatorOrString =
			locate(OTP_CONTAINER).as('OTP CONTAINER');
		await this.switchWebDriver().waitForElement(element, 5);
		const elementVisibleCount: number =
			await this.switchWebDriver().grabNumberOfVisibleElements(OTP_FIELD);
		for (let i = 1; i < elementVisibleCount + 1; i++) {
			await this.switchWebDriver().fillField(
				`${OTP_FIELD}:nth-of-type(${i}) input[type="tel"]`,
				'1',
			);
		}
	}

	async clickConfirmBtn() {
		const element: CodeceptJS.LocatorOrString = locate(
			`span[class*=Login_button]`,
		).as('Confirm button');
		await this.switchWebDriver().click(element);
		await this.switchWebDriver().wait(5);
	}
}
