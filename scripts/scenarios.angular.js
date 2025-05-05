// Angular-specific scenarios for hot reload benchmark
const path = require('path');
module.exports = [
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/users-list.component.ts'),
    search: '<h2>Users List</h2>',
    replaceWith: '<h2>All Users</h2>',
    selector: 'h2',
    expectedText: 'All Users',
    url: 'http://localhost:4200/users',
  },
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/products-list.component.ts'),
    search: '{{product.price | currency}}',
    replaceWith: "{{'€' + product.price}}",
    selector: 'td.mat-column-price',
    expectedText: '€',
    url: 'http://localhost:4200/products',
  },
  // Add more Angular scenarios here if needed
];
