// Subscribe to "ready" event for initialization
JFCustomWidget.subscribe("ready", function(data) {
    const container = document.getElementById('itemContainer');
    
    // If in builder mode, allow item creation
    if (data.mode === 'builder') {
        const addItemButton = document.createElement('button');
        addItemButton.textContent = "Add Item";
        addItemButton.onclick = addNewItem;
        container.appendChild(addItemButton);
    } else if (data.items) { // If in filler mode, display items
        displayItems(data.items);
    }
});

// Function to add a new item in builder mode
function addNewItem() {
    const container = document.getElementById('itemContainer');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    // Create input for text
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Enter item text';
    textInput.classList.add('item-text');

    // Create input for image URL
    const imageInput = document.createElement('input');
    imageInput.type = 'text';
    imageInput.placeholder = 'Enter image URL';
    imageInput.classList.add('item-image');

    itemDiv.appendChild(textInput);
    itemDiv.appendChild(imageInput);
    container.appendChild(itemDiv);

    saveItemsToForm();
}

// Function to display items in filler mode
function displayItems(items) {
    const container = document.getElementById('itemContainer');
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Display image
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.text;

        // Display text
        const text = document.createElement('p');
        text.textContent = item.text;

        // Add number input
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Enter quantity';
        input.dataset.itemIndex = index;

        itemDiv.appendChild(img);
        itemDiv.appendChild(text);
        itemDiv.appendChild(input);

        container.appendChild(itemDiv);
    });
}

// Function to save items to the form
function saveItemsToForm() {
    const items = [];
    document.querySelectorAll('.item').forEach(itemDiv => {
        const text = itemDiv.querySelector('.item-text').value;
        const image = itemDiv.querySelector('.item-image').value;

        if (text && image) {
            items.push({ text, image });
        }
    });

    JFCustomWidget.sendData({ items });
}

// Listen for submission to collect input
JFCustomWidget.subscribe("submit", function() {
    const selectedItems = [];
    document.querySelectorAll('.item input[type="number"]').forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const index = input.dataset.itemIndex;
            selectedItems.push({ index, quantity });
        }
    });

    JFCustomWidget.sendSubmit({ selectedItems });
});
