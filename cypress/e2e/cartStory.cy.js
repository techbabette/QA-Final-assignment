beforeEach(() => {
    cy.fixture("userLoginPairs").then((loginPairs) => {
        cy.login(loginPairs.validInformation);
    })
})
describe("The cart story", () => {
    it("Can add items and checkout", () => {
        cy.visit("/")
    })
})