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
}

export default itemPage;