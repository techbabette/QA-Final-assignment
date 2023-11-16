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
    static get checkoutButton(){
        return cy.get('span').contains('Proceed to Checkout');
    }
    static getPriceCategory(name){
        return cy.get('tr > th.mark').contains(name);
    }
    static getPriceCategoryValue(name){
        return cartPage.getPriceCategory(name).next().children("span");
    }
}

export default cartPage;