const { I } = inject();

export default class BasePage {
	I: CodeceptJS.I;
	constructor(I: CodeceptJS.I) {
		this.I = I;
	}

	switchWebDriver() {
		return codecept_actor();
	}

	async goToWebAdminPage() {
		await codecept_actor().amOnPage('https://web.qa.leapxpert.app/');
	}

	async inputText(options: {
		locator: CodeceptJS.LocatorOrString;
		text: string;
	}) {
		await this.switchWebDriver().waitForElement(options.locator, 5);
		await this.switchWebDriver().clearField(options.locator);
		await this.switchWebDriver().fillField(options.locator, options.text);
		// await I.waitForValue(options.locator, options.text);
	}
}
