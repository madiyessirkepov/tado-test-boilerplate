### tado° test boilerplate

Basic Babel/Webpack/Jest boilerplate introduced as starting point for coding
tasks and experience days.

Allows for TDD with Jest and E2E testing with puppeteer.

#### Pre-requisites

- [node](https://nodejs.org/) >=8
- [yarn](https://yarnpkg.com/)

#### Under the hood

- [babel](https://github.com/babel/babel)
- [jest](https://github.com/facebook/jest)
- [puppeteer](https://github.com/GoogleChrome/puppeteer)
- [dotenv](https://github.com/motdotla/dotenv)
- [eslint](https://github.com/eslint/eslint)
- [webpack](https://webpack.js.org/)

#### Structure

```text
.
├── dist                      # output
├── assets                    # assets copied to dist on build (flattened)
│   ├── index.html            # html template used by webpack
│   └── ...
├── src                       # source code
│   ├── app.js                # webpack entry point
│   ├── app.test.js           # test file for app.js
│   └── ...
├── .babelrc                  # babel configuration
├── .editorconfig             # editor configuration
├── .env.example              # env file example (copy to .env to use)
├── .eslintignore             # eslint ignored files
├── .eslintrc.json            # eslint configuration
├── .gitignore                # git ignored files
├── jest.config.js            # jest configuration
├── jest-puppeteer.config.js  # jest & puppeteer configuration
├── package.json              # dependencies
├── webpack.config.js         # webpack configuration
├── LICENSE.md
└── README.md
```

#### Setup

```bash
yarn
```

#### Usage

```bash
# building
yarn build

# developing with webpack-dev-server
yarn start

# building on file change
yarn watch

# running tests
yarn test

# linting
yarn lint
```

#### Description

I've decided to separate code on small functions to make classes testable and
they are separated into different files.

There are two classes where I defined **ProxyService** and **Service**. In my
implementation **ProxyService** requires **Service[]** to proxy request to one
of those services by selected variant.

Interfaces:

```javascript
interface ProxyService {
    proxy(request: Request): Response;
    getIndexByServiceType(services: Service[]): number;
    getLowestLoadService(services: Service[]): number;
}

interface Service {
    handleRequest(request: Request): Response;
    getLoad();
}
```

`Service.handleRequest()` Is **async** function cause it makes API call.

I had visualise this all process, so I decided to create MiniSystem class which
will handle UI and instantiate services. Which doesn't contain any complex
logic, it creates `<li></li>` elements that will contain service data and when
service gets load UI is updating itself.

```javascript
interface MiniSystem {
    instantiateServices();
    instantiateView();
    bindToButtonClick(id: string);
    updateServiceLoadView();
    sendRequest(type: number);
}
```

I've added `MiniSystem.bindToButtonClick(id: string)` to react on button click
events, while calling proper **ProxyService**. Technically it decide
ProxyService by **value** of button, in example below **value=1** it means
ProxyService with variant 1 will proxy request.

`<button id="btn-1" value="1">TEXT</button>`

PS: didn't cover _mini-system.js_ with tests to avoid of mocking document and
other stuff of browser :D.
