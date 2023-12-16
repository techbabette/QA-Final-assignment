# Final Levi9 QA Assignement

## Test script

Tasked with testing cart functionality on [Magento](https://magento.softwaretestingboard.com/), the test script follows the following flow

| Action  | Expected result (Assertion) |
| ------------- |-------------|
| Click on first item visible.      | Page changes and displays correct item.     |
| Select size and color.      | Chosen size and color are displayed.     |
| Click add to cart.      | Cart icon displays number of items in cart.      |
| Navigate to checkout page.      | Page changes to checkout page.<br>Item size and color match chosen values.     |
| Proceed to shipping page.     | Page changes to shipping page.      |
| Fill shipping information.     | New shipping address added  and visible.      |
| Proceed to payment page.     | Page changes to payment confirmation page.      |
| Confirm payment.     | Page changes to success page and a success message is visible.      |
## CI/CD Integration

Tests are run automatically on every push and test results are published to [Github Pages](https://techbabette.github.io/QA-Final-assignment/).

[Github Pages](https://techbabette.github.io/QA-Final-assignment/) shows the results of the latest run, while previous results are stored on the [gh-pages branch](https://github.com/techbabette/QA-Final-assignment/tree/gh-pages).

![gh-pages preview showing timestamped results](https://i.imgur.com/n3f1CEI.png "gh-pages preview")

