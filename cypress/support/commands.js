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
import shippingPage from "../pages/shippingPage";
import homePage from "../pages/homePage";
import itemPage from "../pages/itemPage";
import cartPage from "../pages/cartPage";
import paymentPage from "../pages/paymentPage";
import successPage from "../pages/successPage";

Cypress.Commands.add('submitLoginForm', (userCredentials) => {
    cy.step('Fill email field');
    loginPage.emailField.type(userCredentials.email);
  
    cy.step('Fill password field');
    loginPage.passwordField.type(userCredentials.password);

    cy.step('Submit form');
    loginPage.submitButton.click();
})

Cypress.Commands.add('login', (userCredentials) => {
    cy.session('validUser', () => {
        cy.visit('/customer/account/login/');
        cy.submitLoginForm(userCredentials);
        cy.getCookie('PHPSESSID').then((sessionId) => {
            cy.setCookie('PHPSESSID', sessionId.value);
        })
    },{
        validate(){
            cy.visit('/customer/account/');
            cy.url().should('contain', '/customer/account/')
        }
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

Cypress.Commands.add('fillShippingFields', (user) => {
    let fieldsAndValues = [
        {field: "firstnameField", val : user.firstname},
        {field: "lastnameField", val : user.lastname},
        {field: "streetField", val : user.street},
        {field: "cityField", val : user.city},
        {field: "countryField", val : user.country, type : "select"},
        {field: "stateField", val : user.state, type : "select"},
        {field: "telephoneField", val : user.telephone},
        {field: "postcodeField", val : user.postcode}
    ]

    for(let field of fieldsAndValues){
        console.log(field.field);
        if(!Object.hasOwn(field, "type")){
            shippingPage[field.field].clear().type(field.val);
            continue;
        }
        if(field.type == "select"){
            shippingPage[field.field].select(field.val);
        }
    }

    shippingPage.saveAddressCheckbox.uncheck();
})

Cypress.Commands.add('clickFirstItemAndVerify', function(){
    homePage.firstItemLink.getPropertyAndClick("text", "selectedItem", ((string) => string.trim()));
    cy.then(function(){
        cy.checkSingleItemLoad();
    })
})

Cypress.Commands.add('checkSingleItemLoad', function() {
    cy.get("@selectedItem").then((itemName) => {
        let correctUrlPart = itemName.split(" ").join("-").toLowerCase();
        cy.url().should("contain", correctUrlPart);
        itemPage.itemName.should("have.text", itemName);
    })
})

Cypress.Commands.add('selectSizeColorAndVerify', function() {
    itemPage.firstSizeOption.getPropertyAndClick("option-label","selectedSize");
    itemPage.firstColorOption.getPropertyAndClick("option-label","selectedColor");
    itemPage.itemPrice.getProperty("text", "itemPrice");

    cy.then(function(){
        itemPage.selectedSizeSpan.should("have.text", this.selectedSize);
        itemPage.selectedColorSpan.should("have.text", this.selectedColor);
    })
})

Cypress.Commands.add('addItemAndVerify', function() {
    cy.step("Add item to cart");
    itemPage.addToCartButton.click();

    cy.step("Check if cart number reflects change")
    itemPage.cartNumberSpan.should("have.text", "1");
    
    itemPage.checkoutLink.click();
    cy.url().should("contain", "checkout/cart");
})

Cypress.Commands.add('checkCartPageInformation', function(){
    cartPage.getItemPropertyValueWithName("Size").should("contain.text", this.selectedSize);
    cartPage.getItemPropertyValueWithName("Color").should("contain.text", this.selectedColor);
    cartPage.getSingleItemPrice.should("contain.text", this.itemPrice);
    // cartPage.getPriceCategoryValue("Subtotal").should("have.text", this.itemPrice);
    cartPage.getPriceCategoryValue("Subtotal").should("be.visible");

    cy.step("Proceed to shipping");
    cartPage.checkoutButton.click();
    cy.url().should("contain", "checkout/#shipping");
})

Cypress.Commands.add('addShippingInfo', function(){
    shippingPage.newAddressButton.click();

    cy.fixture("users.json").then(function(users) {
        let user = users.validInformation;

        cy.fillShippingFields(user);
        cy.step("Confirm shipping information");
        shippingPage.shipHereButton.click();
    })

    shippingPage.nextButton.click();
})

Cypress.Commands.add('confirmPayment', function(){
    paymentPage.billingCheckbox.check();
    paymentPage.placeOrderButton.click();

    cy.url().should("contain", "/checkout/onepage/success");

    successPage.successMessage.should("be.visible");
})

Cypress.Commands.add('setupCartIntercepts', function(){
    cy.intercept(
        {
            url : '**/customer/section/load/*',
            times : 10
        },
        {
            statusCode: 200,
            fixture : "fixedCart.json"
        }
        )

    cy.intercept(
        {
            url : "**/rest/default/V1/carts/mine/totals**"
        },
        {
            statusCode: 200,
            fixture : "fixedTotals.json"
        }
    ).as("totals")

    cy.intercept(
        {
            url : '**/rest/default/V1/carts/mine/estimate-shipping-methods-by-address-id'
        },
        {
            statusCode: 200,
            fixture : "fixedShipping.json"
        }
        )
})