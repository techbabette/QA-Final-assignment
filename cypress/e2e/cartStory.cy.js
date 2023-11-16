import homePage from "../pages/homePage";
import itemPage from "../pages/itemPage";

beforeEach(() => {
    cy.fixture("userLoginPairs").then((loginPairs) => {
        cy.login(loginPairs.validInformation);
    })
})
describe("The cart story", () => {
    it("Can add items and checkout", () => {
        cy.visit("/")
        cy.step("Save item name for future assertions");
        homePage.firstItemLink.getPropertyAndClick("text", "selectedItem", ((string) => string.trim()));

        cy.step("Check if page changed and loads correct item")
        cy.get("@selectedItem").then((itemName) => {
            let correctUrlPart = itemName.split(" ").join("-").toLowerCase();
            cy.url().should("contain", correctUrlPart);
            itemPage.itemName.should("have.text", itemName);
        })

        cy.step("Select size and color");
        itemPage.firstSizeOption.getPropertyAndClick("option-label","selectedSize");
        itemPage.firstColorOption.getPropertyAndClick("option-label","selectedColor");
    })
})