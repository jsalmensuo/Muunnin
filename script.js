document.getElementById('addItemButton').addEventListener('click', function() {
    const itemsContainer = document.getElementById('itemsContainer');
    
    // Create a new div for the input fields
    const newItemDiv = document.createElement('div');
    newItemDiv.classList.add('itemGroup'); // Add the class for styling

    // Create new input fields for item name, amount, and unit
    newItemDiv.innerHTML = `
        <input type="text" class="itemName" placeholder="Item Name">
        <input type="number" class="itemAmount" placeholder="Amount">
        <input type="text" class="itemUnit" placeholder="Unit">
    `;
    
    itemsContainer.appendChild(newItemDiv); // Append the new item group to the container
});

document.getElementById('convertButton').addEventListener('click', function() {
    const inputValue = document.getElementById('inputValue').value;
    const inputValue2 = document.getElementById('inputValue2').value;

    // Initialize an empty result array
    let results = [];

    // Get all item fields
    const itemNames = document.querySelectorAll('.itemName');
    const itemAmounts = document.querySelectorAll('.itemAmount');
    const itemUnits = document.querySelectorAll('.itemUnit');

    // Loop through each item field
    itemNames.forEach((itemName, index) => {
        const itemAmount = itemAmounts[index].value;
        const itemUnit = itemUnits[index].value;

        // Conversion logic
        const factor = inputValue2 / inputValue; // Calculate conversion factor
        const convertedAmount = itemAmount * factor; // Calculate converted amount

        // Store result
        results.push(` ${convertedAmount} ${itemUnit} ${itemName.value}`);
    });

    // Display all results
    document.getElementById('result').innerText = results.join('\n');

    // Prepare the download button
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';
    downloadButton.onclick = function() {
        const recipeName = document.getElementById('recipeName').value; // Get the recipe name
        const inputValue = document.getElementById('inputValue').value; // Get the number of servings
    
        // Create a filename using the recipe name and input value
        const filename = `${recipeName}.txt`;
    
        const blob = new Blob([results.join('\n')], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename; // Use the dynamic filename
        link.click();
    };
});
