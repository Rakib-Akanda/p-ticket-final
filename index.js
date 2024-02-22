// Get references to various elements on the page
const noNumInput = document.getElementById("myInput"); // Input field for numbers
const sameSeatContainers = document.querySelectorAll(".same-seat"); // Containers for seat buttons
const dynamic = document.querySelector(".dyna"); // Element showing dynamic value
const totalPriceElement = document.querySelector(".totalprice"); // Element displaying total price
const applyButton = document.querySelector(".apply"); // Button to apply discount
const grandPrice = document.querySelector(".grandtotal"); // Element displaying grand total price
const couponInput = document.querySelector(".cupon"); // Input field for coupon code
const infobtn = document.querySelector(".info-btn"); // Button to show congratulations message
const congratsElement = document.querySelector(".congrats"); // Element displaying congratulations message
const clearBtn = document.querySelector(".con-but"); // Button to clear congratulations message

// Initialize variables
let selectedButtonCount = 0; // Count of selected buttons
let totalSum = 0; // Total sum of seat values
let discount = 0; // Discount percentage

// Function to apply discount and update total price
function applyDiscount() {
  // Get the value of the coupon input, convert to lowercase, and remove leading/trailing spaces
  const couponValue = couponInput.value.trim().toLowerCase().replace(/\s/g, "");

  // Check the value of the coupon input and apply discount accordingly
  switch (couponValue) {
    case "new15":
      discount = 15;
      break;
    case "couple20":
      discount = 20;
      break;
    default:
      discount = 0;
      break;
  }

  // Calculate discounted total price
  const discountedTotalPrice = totalSum * (1 - discount / 100);

  // Update the inner HTML of the element displaying grand total with the discounted total price
  grandPrice.textContent = discountedTotalPrice;

  // Log the applied discount and the new total price
  console.log(
    `Coupon applied! Discount: ${discount}%. New total price after discount: ${discountedTotalPrice}`
  );
}

// Add event listener for the apply button click to apply discount
applyButton.addEventListener("click", applyDiscount);

// Iterate over each container of seat buttons
for (let i = 0; i < sameSeatContainers.length; i++) {
  const container = sameSeatContainers[i];
  const buttons = container.querySelectorAll("button");

  // Add event listener to each seat button
  for (let j = 0; j < buttons.length; j++) {
    const button = buttons[j];

    button.addEventListener("click", function () {
      // Check if the count of selected buttons is less than four
      if (selectedButtonCount < 4) {
        // Add seat information to the display
        let items = document.querySelector(".box-row");
        items.innerHTML += `<div class="items"><p>${this.value}</p><p>Economy</p><p>550</p></div>`;

        // Change the background color of the clicked button
        this.style.backgroundColor = "#1dd100";

        // Add the value of the clicked button to the total sum
        totalSum += 550;

        // Update the dynamic value display and the button value
        let value = parseInt(dynamic.textContent);
        if (value > 0) {
          value -= 1;
          dynamic.textContent = value;
        }
        this.value = parseInt(this.value) - 1;

        // Increment the selected button count
        selectedButtonCount++;

        // Update the inner HTML of the element displaying the count of selected buttons
        const valElement = document.querySelector(".val");
        if (valElement) {
          valElement.innerHTML = selectedButtonCount.toString();
        }

        // Update the inner HTML of the element displaying the total sum of seat values
        totalPriceElement.innerHTML = totalSum;
      } else {
        console.log("You can only select up to 4 buttons.");
      }
    });
  }
}

// Add event listener to prevent non-numeric input in the number input field
noNumInput.addEventListener("keypress", function (event) {
  if (event.key.match(/[^\d]/)) {
    event.preventDefault();
  }
});

// Add event listener to show congratulations message if the grand total is not 0
infobtn.addEventListener("click", function () {
  if (parseInt(grandPrice.textContent) !== 0) {
    congratsElement.style.visibility = "visible";
  }
});

// Add event listener to hide congratulations message if the grand total is not 0
clearBtn.addEventListener("click", function () {
  if (parseInt(grandPrice.textContent) !== 0) {
    congratsElement.style.visibility = "collapse";
  }
});
