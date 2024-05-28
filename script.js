// Global Selects for use in multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
// Functions
function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validations
  if (newItem === '') {
    alert('Please add an item!');
    // Exist function;
    return;
  }
  // Create new item list
  const li = document.createElement('li');

  // Get value that's being typed in
  // You want the text inside of an element to be a textNode; [research that]
  li.appendChild(document.createTextNode(newItem));

  //   Append to li
  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);

  //   Append to list
  itemList.appendChild(li);
}
// Create button
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Create icon
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Remove item
function removeItem(e) {
  // We're looking to click on the icon
  // Get the parent
  // Check whether it has the .remove-item class
  if (e.target.parentElement.classList.contains('remove-item')) {
    // Remove the whole <li> not just the <i>
    // icon < button < li < list etc...
    e.target.parentElement.parentElement.remove();
  }
}

// Clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

// Event Listeners
// Form
itemForm.addEventListener('submit', addItem);
// List
itemList.addEventListener('click', removeItem);
// Clear all button
clearBtn.addEventListener('click', clearItems);
