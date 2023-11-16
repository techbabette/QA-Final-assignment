class homePage{
    static get billingCheckbox(){
        return cy.get('#billing-address-same-as-shipping-checkmo')
    }
    static get placeOrderButton(){
        return cy.get('span').contains('Place Order');
    }
}

export default homePage;