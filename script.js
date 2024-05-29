// Global Selects for use in multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
// To set edit mode
let isEditMode = false;
// Functions
// Populate from Storage on load
function displayItems() {
  let itemsFromStorage = getItemsfromStorage();

  itemsFromStorage.forEach((item) => {
    // For each item we want to call the addItemToDOM function
    addItemToDOM(item);
    // Check UI
    checkUI();
  });
}

// Adds items UI + Storage
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validations
  if (newItem === '') {
    alert('Please add an item!');
    // Exist function;
    return;
  }
  // Check for editmore
  if (isEditMode) {
    // Remove old, put in new;
    const itemToEdit = itemList.querySelector('.edit-mode');
    // Remove from storage
    removeItemFromStorage(itemToEdit.textContent);
    // Remove the edit-mode class
    itemToEdit.classList.remove('edit-mode');
    // Remove it from the DOM
    itemToEdit.remove();
    // reset edit
    isEditMode = false;
    // After this, is gonna function as if it's adding a new item

    // recheck UI
    checkUI();
  }

  // New item to DOM
  addItemToDOM(newItem);
  // Add to local storage
  addItemToStorage(newItem);
  // Recheck UI after adding children
  checkUI();
  // Clear input after adding it;
  itemInput.value = '';
}
// Add item to DOM
function addItemToDOM(item) {
  // Create new item list
  const li = document.createElement('li');

  // Get value that's being typed in
  // You want the text inside of an element to be a textNode; [research that]
  li.appendChild(document.createTextNode(item));

  //   Append to li
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //   Append to list -DOM
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

// Add item to local storage
function addItemToStorage(item) {
  // Check to see if items in local storage
  let itemsFromStorage = getItemsfromStorage();
  // Push new items to that same array
  itemsFromStorage.push(item);

  // Finally Convert to JSON string to save Array to local Storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Get items from storage
function getItemsfromStorage() {
  // Check to see if items in local storage
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    // If no items in storage, set itemsFromStorage to an empty array
    itemsFromStorage = [];
  } else {
    // If items in storage assign them to our Array
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

// On Click Item
function onClickItem(e) {
  // We're looking to click on the icon
  // Get the parent
  // Check whether it has the .remove-item class
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    // This, we want to happend when we click anywhere else on the <li> except the <x> icon
    // The <li>
    setItemToEdit(e.target);
  }
}

// setItem to Edit
function setItemToEdit(item) {
  isEditMode = true;
  // To remove the class for items that already have it;
  // So that if we click om another to edit, the previous, doesn't remain modifed;

  itemList
    .querySelectorAll('li')
    .forEach((item) => item.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = `
  <i class="fa-solid fa-pen"></i>
  Update Item
  `;
  formBtn.style.backgroundColor = '#228b22';
  itemInput.value = item.textContent;
}

// Remove item
function removeItem(item) {
  if (confirm('Are you sure? ')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);
    // Check UI
    checkUI();
  }
}
// Remove item from storage
function removeItemFromStorage(item) {
  // Retrieves items from storage
  let itemsFromStorage = getItemsfromStorage();

  // Filter out item to be remove
  // filter returns a new array with filtered elements based on condition
  // we then re-asign itemsfromstorage to that new array without our deleted item
  itemsFromStorage = itemsFromStorage.filter(
    (i) => i !== item // Return all items that aren't equal to the one we pass in;
  );
  // Re-set localstorage with new array without deleted item;
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
// Clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from local storage
  localStorage.removeItem('items');

  // Recheck UI after clearing items
  checkUI();
}

// Filter items
function filterItems(e) {
  const text = e.target.value.toLowerCase();

  const lis = itemList.querySelectorAll('li');
  lis.forEach((item) => {
    // firstChild in this case is the first child inside of the <li>
    const itemName = item.firstChild.textContent.toLowerCase();

    // Checks to see if it exists [return of -1] = doesn't exist
    if (itemName.indexOf(text) != -1) {
      // Say, we type [a], it will display those that have an <a>, the others will be displayed <none>
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Chec UI - to update state
function checkUI() {
  // Always clear input when UI check
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');
  // If list length 0, don't show
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    // Show them if there are items in list
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
  // change the form btn from edit mode
  formBtn.innerHTML = `
    <i class="fa-solid fa-plus"></i>
    Add Item
  `;
  formBtn.style.backgroundColor = '#333';

  // edit mode
  isEditMode = false;
}

// Initialize APP
function init() {
  // Event Listeners
  // Form
  itemForm.addEventListener('submit', onAddItemSubmit);
  // List
  itemList.addEventListener('click', onClickItem);
  // Clear all button
  clearBtn.addEventListener('click', clearItems);
  // Filter
  filter.addEventListener('input', filterItems);
  // To populate list with storage items
  document.addEventListener('DOMContentLoaded', displayItems);
  // Global UI check for page load/reload
  checkUI();
}

// Init all
init();
