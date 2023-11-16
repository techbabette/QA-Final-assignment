import homePage from "../pages/homePage";
import itemPage from "../pages/itemPage";
import cartPage from "../pages/cartPage";

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

        cy.step("Check if selected values shown").then(function(){
            itemPage.selectedSizeSpan.should("have.text", this.selectedSize);
            itemPage.selectedColorSpan.should("have.text", this.selectedColor);
        })

        itemPage.itemPrice.getProperty("text", "itemPrice");

        cy.step("Add item to cart");
        itemPage.addToCartButton.click();

        cy.step("Check if cart number reflects change")
        // itemPage.cartNumberSpan.should("have.text", "1");

        itemPage.checkoutLink.click();
        cy.url().should("contain", "checkout/cart");

        cy.step("Check if correct options selected").then(function(){
            cartPage.getItemPropertyValueWithName("Size").should("contain.text", this.selectedSize);
            cartPage.getItemPropertyValueWithName("Color").should("contain.text", this.selectedColor);
            cartPage.getSingleItemPrice.should("contain.text", this.itemPrice);
        })
    })
})