document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let cartTotal = 0.00; // Initialize cartTotal
    const passkey = 'nlscake'; // Passkey for encryption

    function updateCartDisplay() {
      let cartItemsDisplay = document.getElementById('cart-items');
      cartItemsDisplay.innerHTML = ''; // Clear previous items

      cart.forEach((cake) => {
          let cartItem = document.createElement('li');
          cartItem.textContent = `${cake.quantity} ${cake.name} - $${(cake.price * cake.quantity).toFixed(2)}`;
          
          let removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', () => removeItemFromCart(cake));

          cartItem.appendChild(removeButton);
          cartItemsDisplay.appendChild(cartItem);
      });

      let cartTotalElement = document.getElementById('cart-total');
      cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;

      let checkoutButton = document.getElementById('checkout-btn');
      checkoutButton.disabled = cart.length === 0; // Disable checkout if cart is empty
    }

    function removeItemFromCart(cake) {
      cartTotal -= cake.price * cake.quantity;
      cart = cart.filter(item => item !== cake);
      updateCartDisplay();
    }

    function stringToHex(str) {
        let base64 = btoa(unescape(encodeURIComponent(str)));
        let hex = '';
        for (let i = 0; i < base64.length; i++) {
            hex += base64.charCodeAt(i).toString(16);
        }
        return hex.toUpperCase();
    }

    document.querySelectorAll('button.add-button').forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('Button clicked:', e.target.textContent);
            let cakeDetails = e.target.parentNode;
            let cakeName = button.textContent;
            let cakePrice = parseFloat(cakeDetails.querySelector('p').textContent.replace('$', ''));
            let inputElement = cakeDetails.querySelector('input');
            let quantity = inputElement ? parseInt(inputElement.value) : 1;

            // Check if the cake is already in the cart
            let cakeInCart = cart.find(cake => cake.name === cakeName);

            if (cakeInCart) {
                // If the cake is already in the cart, update its quantity
                cakeInCart.quantity += quantity;
            } else {
                // Add the cake to the cart
                cart.push({ name: cakeName, price: cakePrice, quantity: quantity });
            }

            cartTotal += cakePrice * quantity;

            // Update the cart display
            updateCartDisplay();
            
            // Trigger the animation
            button.classList.remove('add-button-animation');
            void button.offsetWidth; // Trigger reflow
            button.classList.add('add-button-animation');
        });
    });

    function generateSpecialCode(cart) {
        let encodedData = '';
        cart.forEach((cake) => {
          // Concatenate cake name and quantity with a separator
          encodedData += `${cake.name}:${cake.quantity},`;
        });
        // Remove trailing comma
        encodedData = encodedData.slice(0, -1);
        
        // Encrypt and compress the data
        let encryptedData = encryptData(encodedData, passkey);
        let compressedData = compressData(encryptedData);
        
        // URL encode the compressed data
        return encodeURIComponent(compressedData);
      }
      

    function encryptData(data, passkey) {
      // Caesar cipher encryption
      let result = '';
      for (let i = 0; i < data.length; i++) {
        let charCode = data.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
          result += String.fromCharCode((charCode - 65 + passkey.length) % 26 + 65);
        } else if (charCode >= 97 && charCode <= 122) {
          result += String.fromCharCode((charCode - 97 + passkey.length) % 26 + 97);
        } else {
          result += data.charAt(i);
        }
      }
      return result;
    }

    function compressData(data) {
      // Use LZString or another compression algorithm here
      // For simplicity, we'll just return the data as is
      return data;
    }

    document.getElementById('checkout-btn').addEventListener('click', () => {
      let specialCode = generateSpecialCode(cart);
      displaySpecialCode(specialCode); // Display the special code
      // Reset cart total and items after checkout
      cartTotal = 0.00;
      cart = [];
      updateCartDisplay();
    });

    function displaySpecialCode(code) {
      let specialCodeDisplay = document.getElementById('special-code');
      specialCodeDisplay.textContent = code;
    }
});




  
  

























