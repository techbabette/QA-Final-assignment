class successPage{
    static get successMessage(){
        return cy.get("span").contains("Thank you for your purchase!");
    }
}

export default successPage;