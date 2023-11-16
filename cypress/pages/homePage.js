class homePage{
    static get firstItem(){
        return cy.get(".product-item").first();
    }
    static get firstItemLink(){
        return homePage.firstItem.find(".product-item-link");
    }
}

export default homePage;