class shippingPage{
    static get newAddressButton(){
        return cy.get("span").contains("New Address");
    }
    static get firstnameField(){
        return cy.get("[name=firstname]");
    }
    static get lastnameField(){
        return cy.get("[name=lastname]");
    }
    static get streetField(){
        return cy.get("[name='street[0]']");
    }
    static get cityField(){
        return cy.get("[name=city]");
    }
    static get stateField(){
        return cy.get('[name=region_id]');
    }
    static get countryField(){
        return cy.get("[name=country_id]");
    }
    static get telephoneField(){
        return cy.get('[name=telephone]');
    }
    static get postcodeField(){
        return cy.get('[name=postcode]');
    }
    static get saveAddressCheckbox(){
        return cy.get('#shipping-save-in-address-book');
    }
    static get shipHereButton(){
        return cy.get('span').contains('Ship here');
    }
    static get nextButton(){
        return cy.get('span').contains('Next');
    }
}

export default shippingPage;