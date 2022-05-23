This assignment for leapxpert .

### Description 

- This framework test will run one time include :
  - init appium server
  - init selenium server
  - get QR code of User 1 firstly
  - Then, login in mobile application and send message
  - Then, go to web and login with User 2
  - verify message on Web of User 2

### HOW TO RUN :

1. Install `yarn` , `typescript`, Android simulator
2. Install dependencies in package.json by `yarn` command
3. Change `DEVICE_NAME` with your device name
4. Run with command : `yarn test` 

### NOTE 

Do not init appium or selenium standalone before trigger test . That will make conflict port for this build

#### Why I use typescript : 

Because I use `suggestion` feature from javascript . Beside that, I use concept `switcherDriver` to use parallel WebdriverIO and Appium.
