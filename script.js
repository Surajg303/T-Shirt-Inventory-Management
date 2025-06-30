let inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
let customers = JSON.parse(localStorage.getItem('customers') || '[]');

function saveData() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
  localStorage.setItem('customers', JSON.stringify(customers));
}

function renderInventory() {
  const table = document.getElementById('inventoryTable');
  table.innerHTML = '';
  inventory.forEach((item, i) => {
    table.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.brand}</td>
      <td>${item.stock}</td>
      <td><button onclick="deleteInventory(${i})">Delete</button></td>
    </tr>`;
  });

  const itemSelect = document.getElementById('invoiceItem');
  itemSelect.innerHTML = '<option value="">Select Item</option>';
  inventory.forEach(item => {
    itemSelect.innerHTML += `<option value="${item.name}">${item.name}</option>`;
  });
}

function renderCustomers() {
  const table = document.getElementById('customerTable');
  table.innerHTML = '';
  customers.forEach((cust, i) => {
    table.innerHTML += `<tr>
      <td>${cust}</td>
      <td><button onclick="deleteCustomer(${i})">Delete</button></td>
    </tr>`;
  });

  const custSelect = document.getElementById('invoiceCustomer');
  custSelect.innerHTML = '<option value="">Select Customer</option>';
  customers.forEach(c => {
    custSelect.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

function addInventory() {
  const name = document.getElementById('itemName').value.trim();
  const brand = document.getElementById('itemBrand').value;
  const stock = parseInt(document.getElementById('itemStock').value);
  if (!name || !brand || isNaN(stock)) return alert('Enter name, brand and valid stock');
  inventory.push({ name, brand, stock });
  document.getElementById('itemName').value = '';
  document.getElementById('itemBrand').value = '';
  document.getElementById('itemStock').value = '';
  saveData();
  renderInventory();
}

function deleteInventory(i) {
  inventory.splice(i, 1);
  saveData();
  renderInventory();
}

function addCustomer() {
  const name = document.getElementById('customerName').value.trim();
  if (!name) return alert('Enter customer name');
  customers.push(name);
  document.getElementById('customerName').value = '';
  saveData();
  renderCustomers();
}

function deleteCustomer(i) {
  customers.splice(i, 1);
  saveData();
  renderCustomers();
}

function generateInvoice() {
  const cust = document.getElementById('invoiceCustomer').value;
  const itemName = document.getElementById('invoiceItem').value;
  const qty = parseInt(document.getElementById('invoiceQty').value);
  if (!cust || !itemName || isNaN(qty)) return alert('Fill all invoice fields');
  const item = inventory.find(i => i.name === itemName);
  if (!item || item.stock < qty) return alert('Insufficient stock');
  item.stock -= qty;
  saveData();
  renderInventory();
  document.getElementById('invoiceResult').innerHTML = `
    <h3>Invoice</h3>
    <p><strong>Customer:</strong> ${cust}</p>
    <p><strong>Item:</strong> ${item.name} (${item.brand})</p>
    <p><strong>Quantity:</strong> ${qty}</p>
    <p><em>Date:</em> ${new Date().toLocaleString()}</p>
  `;
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

renderInventory();
renderCustomers();
