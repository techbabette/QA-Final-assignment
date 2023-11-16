// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loginPage from "../pages/loginPage";

Cypress.Commands.add("submitLoginForm", (userCredentials) => {
    cy.step("Fill email field");
    loginPage.emailField.type(userCredentials.email);
  
    cy.step("Fill password field");
    loginPage.passwordField.type(userCredentials.password);

    cy.step("Submit form");
    loginPage.submitButton.click();
})

Cypress.Commands.add("login", (userCredentials) => {
    cy.session("validUser", () => {
        cy.visit("/customer/account/login/");
        cy.submitLoginForm(userCredentials);
        cy.getCookie("PHPSESSID").then((sessionId) => {
            cy.setCookie("PHPSESSID", sessionId.value);
        })
    })
})

Cypress.Commands.add("getProperty",  { prevSubject: true }, (subject, property, alias, permutation = ((el) => el)) => {
    if (property === 'text') {
        cy.wrap(subject).invoke('text').then((newValue) => {
            cy.wrap(permutation(newValue)).as(alias)
        });
    } else {
        cy.wrap(subject).invoke('attr', property).then((newValue) => {
            cy.wrap(permutation(newValue)).as(alias)
        });
    }
})

Cypress.Commands.add('getPropertyAndClick',  { prevSubject: true }, (subject, property, alias, permutation = ((el) => el)) => {
        cy.wrap(subject).getProperty(property, alias, permutation);
        cy.wrap(subject).click();
})