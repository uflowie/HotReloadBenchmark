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
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/inventory-list.component.ts'),
    search: '<mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>',
    replaceWith: '<mat-paginator [pageSizeOptions]="[15, 20]" showFirstLastButtons></mat-paginator>',
    selector: 'mat-paginator',
    expectedText: '15',
    url: 'http://localhost:4200/inventory',
  },
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/customers-list.component.ts'),
    search: 'Email_',
    replaceWith: 'Contact Email',
    selector: '#email-header',
    expectedText: 'Contact Email',
    url: 'http://localhost:4200/customers',
  },
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/add-supplier.component.ts'),
    search: '<!-- <mat-hint>Enter supplier name</mat-hint> -->',
    replaceWith: '<mat-hint>Enter supplier name</mat-hint>',
    selector: 'mat-hint',
    expectedText: 'Enter supplier name',
    url: 'http://localhost:4200/add-supplier',
  },
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/add-payment.component.ts'),
    search: '<!--PAYMENT_OPTIONS-->',
    replaceWith: '<mat-option value="paypal">PayPal</mat-option>',
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
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/create-ticket.component.ts'),
    search: '<textarea matInput formControlName="issue" rows="4" required></textarea>',
    replaceWith: '<textarea matInput formControlName="issue" rows="5" required></textarea>',
    selector: 'textarea[formcontrolname=issue]',
    expectedText: '', // rows attribute is not in textContent, so just check existence
    url: 'http://localhost:4200/create-ticket',
    postPatchEval: async (page) => {
      const el = await page.locator('textarea[formcontrolname=issue]');
      const rows = await el.getAttribute('rows');
      if (rows !== '5') throw new Error('Textarea rows attribute is not 5');
    }
  },
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/new-notification.component.ts'),
    search: "message: ['', Validators.required]",
    replaceWith: "message: ['You have a new notification!', Validators.required]",
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
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/home.component.ts'),
    search: '<h1>Hello World</h1>',
    replaceWith: '<h1>Welcome to HotReload Benchmark!</h1>',
    selector: 'h1',
    expectedText: 'Welcome to HotReload Benchmark!',
    url: 'http://localhost:4200/',
  },
  {
    filePath: path.resolve(__dirname, '../clients/angular/src/app/components/side-nav.component.ts'),
    search: '<mat-toolbar color="primary">Navigation</mat-toolbar>',
    replaceWith: '<mat-toolbar color="primary" style="background: #007ACC;">Navigation</mat-toolbar>',
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
  // Add more Angular scenarios here if needed
];
