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
    static get addToCartButton(){
        return cy.get("#product-addtocart-button");
    }
    static get cartMenuButton(){
        return cy.get(".minicart-wrapper");
    }
    static get proceedButton(){
        return cy.get("#top-cart-btn-checkout");
    }
    static get cartNumberLabel(){
        return cy.get("span").contains("items");
    }
    static get cartNumberSpan(){
        return cy.get(".counter-number");
    }
}

export default itemPage;