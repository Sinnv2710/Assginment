require('ts-node/register');
require('dotenv').config({ path: './test.envdotenv' });
const path = require('path');

const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
const { exec } = require('child_process');
const { Worker, isMainThread } = require('worker_threads');
setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();
let serverWorker = null;

const drivers = {
	chrome: {
		version: 'latest',
		seleniumArgs: ['-host', '127.0.0.1', '-port', '4444'],
	},
};

function startServer() {
	serverWorker = new Worker('./codecept.conf.js', {
		workerData: { port: 4723 },
	});
	return new Promise((resolve, reject) => {
		exec('appium');
		serverWorker.once('online', resolve);
	});
}

function stopAppiumServer() {
	exec('kill -9 `lsof -t -i:4723`');
}

function stopSeleniumServer() {
	exec('kill -9 `lsof -t -i:4444`');
}

exports.config = {
	tests: './features/*.feature',
	output: './output',
	helpers: {
		WebDriver: {
			url: 'https://www.google.com',
			browser: 'chrome',
			restart: false,
			host: 'localhost',
			port: 4444,
			path: '/wd/hub/',
			keepCookies: false,
			keepBrowserState: false,
			windowSize: '1366x768',
			capabilities: {
				chromeOptions: {
					args: ['--disable-gpu', '--no-sandbox', '--disable-notifications'],
				},
			},
		},
		Appium: {
			platform: 'Android',
			device: `${process.env.DEVICE_NAME}`,
			port: 4723,
			host: 'localhost',
			path: '/wd/hub',
			desiredCapabilities: {
				platformName: 'Android',
				deviceName: `${process.env.DEVICE_NAME}`,
				automationName: 'UiAutomator2',
				appPackage: 'com.leapxpert.manager.qa',
				appActivity: 'com.leapxpertapp.MainActivity',
				cleanSession: false,
				app: path.resolve('./app-qa-release.apk'),
				noReset: false,
				autoGrantPermissions: true,
			},
		},
		ChaiWrapper: {
			require: 'codeceptjs-chai',
		},
	},
	plugins: {
		wdio: {
			enabled: true,
			services: ['selenium-standalone'],
			seleniumArgs: {
				logPath: 'logs',
				installArgs: {
					drivers,
				},
				args: {
					drivers,
				},
			},
		},
	},
	include: {
		I: './actor.js',
	},
	async bootstrap() {
		if (isMainThread) {
			await startServer();
		}
	},
	async teardown() {
		await stopAppiumServer();
		codeceptjs.recorder.add('quit', () => {
			console.log('Appium server is shutdown');
		});
		await stopSeleniumServer();
		codeceptjs.recorder.add('quit', () => {
			console.log('Selenium server is shutdown');
		});
	},
	gherkin: {
		features: './features/*.feature',
		steps: './step_definitions/steps.ts',
	},
	name: 'xleap',
};
