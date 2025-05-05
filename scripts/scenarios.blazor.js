// Blazor-specific scenarios for hot reload benchmark
const path = require('path');
module.exports = [
  {
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/Users.razor'),
    search: '<h2>Users List</h2>',
    replaceWith: '<h2>All Users</h2>',
    selector: 'h2',
    expectedText: 'All Users',
    url: 'http://localhost:5000/users',
  },
  {
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/Products.razor'),
    search: '<RadzenDataGridColumn TItem="BlazorClient.Product" Property="Price" Title="Price" />',
    replaceWith: '<RadzenDataGridColumn TItem="BlazorClient.Product" Property="Price" Title="Price">$@context.Price</RadzenDataGridColumn>',
    selector: 'td[data-property="Price"]',
    expectedText: '$',
    url: 'http://localhost:5000/products',
  },
  // Add more Blazor scenarios here if needed
];
