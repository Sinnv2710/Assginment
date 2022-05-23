import basePage from './BasePage';
import loginPage from './LoginPage';
import homePage from './HomePage';
import loginScreen from './screen/loginScreen';

export class Controller {
	I: CodeceptJS.I;

	getBasePage() {
		return new basePage(this.I);
	}

	getLoginPage() {
		return new loginPage(this.I);
	}

	getHomePage() {
		return new homePage(this.I);
	}

	getLoginScreen() {
		return new loginScreen(this.I);
	}
}
