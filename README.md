### tado° test boilerplate

Basic Babel/Webpack/Jest boilerplate introduced as starting point for coding tasks and experience days.

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



