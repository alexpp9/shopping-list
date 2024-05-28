// Global Selects for use in multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
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
  // Recheck UI after adding children
  checkUI();
  li.appendChild(button);

  //   Append to list
  itemList.appendChild(li);
  // Clear input after adding it;
  itemInput.value = '';
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
    // Check intention
    if (window.confirm('Are you sure you want to delete the item?')) {
      // Remove the whole <li> not just the <i>
      // icon < button < li < list etc...
      e.target.parentElement.parentElement.remove();
      // Recheck UI after removing items
      checkUI();
    }
  }
}

// Clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
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
}

// Event Listeners
// Form
itemForm.addEventListener('submit', addItem);
// List
itemList.addEventListener('click', removeItem);
// Clear all button
clearBtn.addEventListener('click', clearItems);
// Filter
filter.addEventListener('input', filterItems);
// Global UI check for page load/reload
checkUI();
