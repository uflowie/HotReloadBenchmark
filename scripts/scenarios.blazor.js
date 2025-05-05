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
  // Add more Blazor scenarios here if needed
];
