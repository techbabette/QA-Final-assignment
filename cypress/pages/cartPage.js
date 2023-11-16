class cartPage{
    static getItemPropertyWithName(name){
        return cy.get(".item-options dt").contains(name);
    }
    static getItemPropertyValueWithName(name){
        return cartPage.getItemPropertyWithName(name).next();
    }
    static get getSingleItemPrice(){
        return cy.get(".cart-price").first().children("span");
    }
}

export default cartPage;