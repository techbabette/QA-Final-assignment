class itemPage{
    static get itemName(){
        return cy.get('[itemprop=name]');
    }
    static get firstSizeOption(){
        return cy.get('div[id*=option-label-size]').first();
    }
    static get firstColorOption(){
        return cy.get('div[id*=option-label-color]').first();
    }
    static get selectedSizeSpan(){
        return cy.get('span[id*=option-label-size]').next();
    }
    static get selectedColorSpan(){
        return cy.get('span[id*=option-label-color]').next();
    }
    static get itemPrice(){
        return cy.get("[data-price-type=finalPrice]").first().children("span");
    }
    static get addToCartButton(){
        return cy.get("#product-addtocart-button");
    }
    static get checkoutLink(){
        return cy.get("a").contains("shopping cart");
    }
    static get cartNumberSpan(){
        return cy.get(".counter-number");
    }
}

export default itemPage;