# OpenFileButtonDemo

\- Angular 20 application (with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1) + Angular Material.

\- Demo application with 2 open file buttons.

\- Can open images: png, jpg and gif - and shows a preview.

\- Can open PDF-files.

\- See the root of this project for example images.

## Installation + run app

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_November 2025_

\- Upgrade to _Angular 21_ and upgraded other packages.

*   Removed deprecated _Karma_ and installed _Vitest._
*   Migrated _Jasmine_ tests to _Vitest_ tests for future use (command: **ng generate refactor-jasmine-vitest**).

\- Migration to _Zoneless_ (Without _Zone.js_ - removed package _zone.js_)

\- Some other small changes.

_June 2025_

\- Upgrade to Angular 20. 

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Various changes.