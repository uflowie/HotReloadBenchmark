// Blazor-specific scenarios for hot reload benchmark
const path = require('path');
module.exports = [
  {
    name: 'Scenario 1 (Users List: heading <h2>Users List</h2> → All Users)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/Users.razor'),
    search: '<h2>Users List</h2>',
    replaceWith: '<h2>All Users</h2>',
    selector: 'h2',
    expectedText: 'All Users',
    url: 'http://localhost:5000/users',
  },

  {
    name: 'Scenario 2 (Products List: prepend $ to price)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/Products.razor'),
    search: '<RadzenDataGridColumn TItem="BlazorClient.Product" Property="Price" Title="Price" />',
    replaceWith: `<RadzenDataGridColumn TItem="BlazorClient.Product" Property="Price" Title="Price">
      <Template Context="product">
        €@product.Price
      </Template>
    </RadzenDataGridColumn>`,
    selector: 'td:nth-child(4) span.rz-cell-data.rz-text-truncate',
    expectedText: '€',
    url: 'http://localhost:5000/products',
  },
  {
    name: 'Scenario 3 (Inventory List: default page size 10 → 15)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/Inventory.razor'),
    search: '<RadzenDataGrid Data="inventory" ShowPagingSummary="true" TItem="BlazorClient.InventoryItem" AllowPaging="true" AllowFiltering="true" AllowSorting="true">',
    replaceWith: '<RadzenDataGrid Data="inventory" PageSize="15" ShowPagingSummary="true" TItem="BlazorClient.InventoryItem" AllowPaging="true" AllowFiltering="true" AllowSorting="true">',
    selector: '.rz-pager-summary',
    expectedText: 'Page 1 of 4',
    url: 'http://localhost:5000/inventory',
  },
  // Add more Blazor scenarios here if needed
];
