import BasePage from './BasePage';

const { I } = inject();

export const AVATAR_PROFILE = `div[class*=NavSide_nav-side] div[data-testid="avatar-image"],[data-testid="link-to-profile-page"] [data-testid="avatar-string"]`;
export const CONTACT_TAB = `div[class*=NavSide_nav] a[class*=NavSideItem]#contact`;
export const DEVICE_TAB = `div[class*='DeviceTab_title']`;
export const LINK_DEVICE_BTN = `button[class*='DeviceTab_link-button']`;
export const LINK_DEVICE_MODAL = `div[class*='LinkDeviceModal_modal'][role='dialog']`;
export const QRCODE_FIELD = `div[class*='LinkDeviceModal_code-name']`;

export default class HomePage extends BasePage {
	constructor(I: CodeceptJS.I) {
		super(I);
	}

	async amOnHomePage() {
		const element: CodeceptJS.LocatorOrString =
			locate(AVATAR_PROFILE).as('Avatar profile');
		await this.switchWebDriver().waitForVisible(element, 60);
		const elementVisibleCount: number =
			await this.switchWebDriver().grabNumberOfVisibleElements(element);
		await this.switchWebDriver().assertAbove(
			elementVisibleCount,
			0,
			'Avatar profile is not visible',
		);
	}

	async goToContactPage() {
		const element: CodeceptJS.LocatorOrString =
			locate(CONTACT_TAB).as('Contact tab');
		await this.switchWebDriver().click(element);
	}

	async goToProfile() {
		const element: CodeceptJS.LocatorOrString =
			locate(AVATAR_PROFILE).as('profile');
		await this.switchWebDriver().waitForElement(element, 60);
		await this.switchWebDriver().click(element);
	}

	async clickTab(tab: string) {
		const element: CodeceptJS.LocatorOrString = locate(
			`div[class*=Account_button]`,
		)
			.withText(tab)
			.as('Devices tab');
		await this.switchWebDriver().waitForElement(element, 10);
		await this.switchWebDriver().click(element);
	}

	async verifyDeviceTab() {
		const element: CodeceptJS.LocatorOrString =
			locate(DEVICE_TAB).as('Devices tab');
		await this.switchWebDriver().waitForElement(element, 10);
		const elementVisibleCount: number =
			await this.switchWebDriver().grabNumberOfVisibleElements(element);
		await this.switchWebDriver().assertAbove(
			elementVisibleCount,
			0,
			'Devices tab is not visible',
		);
	}

	async clickLinkDevice() {
		const element: CodeceptJS.LocatorOrString =
			locate(LINK_DEVICE_BTN).as('Link device button');
		await this.switchWebDriver().waitForElement(element, 30);
		await this.switchWebDriver().click(element);

		const elementModal: CodeceptJS.LocatorOrString =
			locate(LINK_DEVICE_MODAL).as('Link device modal');
		await this.switchWebDriver().waitForVisible(elementModal, 30);
	}

	async getQRCode() {
		const element: CodeceptJS.LocatorOrString =
			locate(QRCODE_FIELD).as('QR code');
		await this.switchWebDriver().waitForElement(element, 60);
		const qrCode: string = await this.switchWebDriver().grabTextFrom(element);
		return qrCode;
	}

	async findRoomChat(account: string) {
		const element = `div[data-testid="roomItem"] div[data-testid="room-name"] span[title*='${account}']`;

		await this.switchWebDriver().waitForElement(element, 60);
		await this.switchWebDriver().seeElement(element);
	}

	async findChatText(chatText: string) {
		const messageList = await this.switchWebDriver().grabTextFromAll(
			`div[class*='MessageList_message-list__item'] span[class*=MessageItem_arrow] span[class]`,
		);
		const isContain = messageList.some((item) => item.includes(chatText));
		this.switchWebDriver().assertTrue(isContain, 'Chat text is not found');
	}

	async logout() {
		await this.switchWebDriver().executeScript(() => {
			window.localStorage.clear();
		});
		await this.switchWebDriver().refreshPage();
		await this.switchWebDriver().waitForElement(
			`div[class*=Login_company]`,
			60,
		);
	}
}
