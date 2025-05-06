// Angular-specific scenarios for hot reload benchmark
const path = require('path');
module.exports = [
  {
    name: 'Scenario 1 (Users List: heading <h2> → All Users)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/users-list.component.ts'),
        search: '<h2>Users List</h2>',
        replaceWith: '<h2>All Users</h2>',
      },
    ],
    selector: 'h2',
    expectedText: 'All Users',
    url: 'http://localhost:4200/users',
  },
  {
    name: 'Scenario 2 (Products List: prepend € to price)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/products-list.component.ts'),
        search: '{{product.price | currency}}',
        replaceWith: "{{'€' + product.price}}",
      },
    ],
    selector: 'td.mat-column-price',
    expectedText: '€',
    url: 'http://localhost:4200/products',
  },
  {
    name: 'Scenario 3 (Inventory List: default page size 10 → 15)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/inventory-list.component.ts'),
        search: '<mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>',
        replaceWith: '<mat-paginator [pageSizeOptions]="[15, 20]" showFirstLastButtons></mat-paginator>',
      },
    ],
    selector: 'mat-paginator',
    expectedText: '15',
    url: 'http://localhost:4200/inventory',
  },
  {
    name: 'Scenario 4 (Customers List: rename Email → Contact Email)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/customers-list.component.ts'),
        search: 'Email_',
        replaceWith: 'Contact Email',
      },
    ],
    selector: '#email-header',
    expectedText: 'Contact Email',
    url: 'http://localhost:4200/customers',
  },
  {
    name: 'Scenario 5 (Add Supplier Form: add placeholder to name input)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/add-supplier.component.ts'),
        search: '<!-- <mat-hint>Enter supplier name</mat-hint> -->',
        replaceWith: '<mat-hint>Enter supplier name</mat-hint>',
      },
    ],
    selector: 'mat-hint',
    expectedText: 'Enter supplier name',
    url: 'http://localhost:4200/add-supplier',
  },
  {
    name: 'Scenario 6 (Add Payment Form: add PayPal option)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/add-payment.component.ts'),
        search: '<!--PAYMENT_OPTIONS-->',
        replaceWith: '<mat-option value="paypal">PayPal</mat-option>',
      },
    ],
    selector: 'mat-option[value="paypal"]',
    expectedText: 'PayPal',
    url: 'http://localhost:4200/add-payment',
    preEval: async (page) => {
      await page.locator('mat-select[formcontrolname=method]').click();
    },
    postPatchEval: async (page) => {
      await page.locator('mat-select[formcontrolname=method]').click();
    },

  },
  {
    name: 'Scenario 7 (Create Ticket: textarea rows 4 → 5)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/create-ticket.component.ts'),
        search: '<textarea matInput formControlName="issue" rows="4" required></textarea>',
        replaceWith: '<textarea matInput formControlName="issue" rows="5" required></textarea>',
      },
    ],
    search: '<textarea matInput formControlName="issue" rows="4" required></textarea>',
    replaceWith: '<textarea matInput formControlName="issue" rows="5" required></textarea>',
    selector: 'textarea[formcontrolname=issue]',
    expectedText: '', // rows attribute is not in textContent, so just check existence
    url: 'http://localhost:4200/create-ticket',
    waitForFn: {
      fn: () => {
        const el = document.querySelector('textarea[formcontrolname=issue]');
        return el && el.getAttribute('rows') === '5';
      },
      args: undefined,
      timeout: 10000
    }
  },
  {
    name: 'Scenario 8 (New Notification: default message update)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/new-notification.component.ts'),
        search: "message: ['', Validators.required]",
        replaceWith: "message: ['You have a new notification!', Validators.required]",
      },
    ],
    selector: 'textarea',
    expectedText: 'You have a new notification!',
    url: 'http://localhost:4200/new-notification',
    waitForFn: {
      fn: () => { const el = document.querySelector('textarea'); return el && el.value === 'You have a new notification!'; },
      args: undefined,
      timeout: 10000
    }
  },
  {
    name: 'Scenario 9 (Home Page: text Hello World → Welcome to HotReload Benchmark!)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/home.component.ts'),
        search: '<h1>Hello World</h1>',
        replaceWith: '<h1>Welcome to HotReload Benchmark!</h1>',
      },
    ],
    selector: 'h1',
    expectedText: 'Welcome to HotReload Benchmark!',
    url: 'http://localhost:4200/',
  },
  {
    name: 'Scenario 10 (Layout/NavMenu: background color #ffffff → #007ACC)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/side-nav.component.ts'),
        search: '<mat-toolbar color="primary">Navigation</mat-toolbar>',
        replaceWith: '<mat-toolbar color="primary" style="background: #007ACC;">Navigation</mat-toolbar>',
      },
    ],
    selector: 'mat-toolbar',
    expectedText: 'Navigation',
    url: 'http://localhost:4200/',
    waitForFn: {
      fn: () => {
        const el = document.querySelector('mat-toolbar');
        return el && getComputedStyle(el).backgroundColor === 'rgb(0, 122, 204)';
      },
      args: undefined,
      timeout: 10000
    }
  },
  {
    name: 'Scenario 11 (Users List: highlight admin users with badge)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/users-list.component.ts'),
        search: '<h2>Users List</h2>',
        replaceWith: `<h2>Users List</h2>\n<style>\n  .admin-badge {\n    background: #ffc107;\n    color: #222;\n    border-radius: 4px;\n    padding: 2px 6px;\n    font-size: 0.8em;\n    margin-left: 6px;\n    font-weight: 500;\n  }\n</style>`
      },
      {
        filePath: path.resolve(__dirname, '../clients/angular/src/app/components/users-list.component.ts'),
        search: '{{user.name}}',
        replaceWith: `{{user.name}} <span *ngIf=\"user.email.endsWith('@admin.com')\" class=\"admin-badge\">Admin</span>`
      }
    ],
    selector: '.admin-badge',
    expectedText: 'Admin',
    url: 'http://localhost:4200/users',
  },
];
