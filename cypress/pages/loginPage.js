class loginPage{
    static get emailField(){
        return cy.get("#email");
    }
    static get passwordField(){
        return cy.get("#pass");
    }
    static get submitButton(){
        return cy.get("#send2");
    }
}

export default loginPage;