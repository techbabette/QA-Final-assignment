beforeEach(() => {
    cy.fixture("userLoginPairs").then((loginPairs) => {
        cy.login(loginPairs.validInformation);
    })
    cy.visit('/');
})
describe("The cart story", () => {
    it("Can add items and checkout", () => {
        cy.step("Open first item visible and verify");
        cy.clickFirstItemAndVerify();

        cy.step("Select size, color and verify");
        cy.selectSizeColorAndVerify();

        cy.setupCartIntercepts();

        cy.step("Add item to cart, verify, proceed to checkout");
        cy.addItemAndVerify();

        cy.step("Check if cart page information correct and proceed to shipping");
        cy.checkCartPageInformation();

        cy.step("Add shipping information and proceed to payment page");
        cy.addShippingInfo();

        cy.step('Confirm payment and verify');
        cy.confirmPayment()
    })
})