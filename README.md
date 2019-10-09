# Split the bill

Features of Split the bill app:

1. It can fetch user, expense, settle up list dynamically from mock json server and show on page.
2. It shows User/Person, Expense, Settle up list.
3. It can Add User/Person to list.
4. Show No. Debts found in the name of Person (User).
5. It fetches Settle up list statically as no actual DB used in application.
6. Works for Desktop, Tablet and Mobile.
7. It uses mobile first approach in UI Design.
8. It uses facade design pattern.
9. It has global error handling with individual component level error handling.
10. App is based on modular architecture and lazy load each page.

## For Server Installation

`cd server`, then `npm i` in sudo or administrator mode(preferred)

### Run Server

Run `npm run json:server` to start mock server at `http://localhost:3000/`

## For Client Installation

`cd client`, then `npm i` in sudo or administrator mode(preferred)


### Run Client

Run `ng serve`. Navigate to `http://localhost:4200/`.


### Build Client

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests in Client

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests in Client

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
