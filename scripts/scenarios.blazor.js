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
  {
    name: 'Scenario 4 (Customers List: rename column Email → Contact Email)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/Customers.razor'),
    search: '<RadzenDataGridColumn TItem="BlazorClient.Customer" Property="Email" Title="Email" />',
    replaceWith: '<RadzenDataGridColumn TItem="BlazorClient.Customer" Property="Email" Title="Contact Email" />',
    selector: 'th:nth-child(3)',
    expectedText: 'Contact Email',
    url: 'http://localhost:5000/customers',
  },
  {
    name: 'Scenario 5 (Add Supplier Form: add placeholder="Enter supplier name" to name input)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/AddSupplier.razor'),
    search: '<RadzenTextBox @bind-Value="supplier.Name" Name="Name" Style="width: 100%" />',
    replaceWith: `<RadzenTextBox @bind-Value="supplier.Name" Name="Name" Style="width: 100%" placeholder="Enter supplier name" />`,
    selector: 'input[name="Name"]',
    expectedText: '',
    waitForFn: {
      fn: () => {
        const el = document.querySelector('input[name="Name"]');
        return el && el.getAttribute('placeholder') === 'Enter supplier name';
      },
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/add-supplier',
  },
  {
    name: 'Scenario 6 (Add Payment Form: add PayPal option)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/AddPayment.razor'),
    search: 'private List<string> methods = new() { "Credit Card", "PayPal", "Bank Transfer" };',
    replaceWith: 'private List<string> methods = new() { "Credit Card", "PayPal", "Bank Transfer" };',
    selector: 'input[name="Method"]',
    expectedText: '',
    preEval: async (page) => {
      await page.locator('.rz-dropdown').nth(1).click();
    },
    postPatchEval: async (page) => {
      await page.locator('.rz-dropdown').nth(1).click();
    },
    waitForFn: {
      fn: () => Array.from(document.querySelectorAll('li.rz-dropdown-item')).some(el => el.textContent.includes('PayPal')),
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/add-payment',
  },
  {
    name: 'Scenario 7 (Create Ticket: textarea rows="4" → rows="5")',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/CreateTicket.razor'),
    search: '<RadzenTextArea @bind-Value="ticket.Issue" Name="Issue" Style="width: 100%" />',
    replaceWith: '<RadzenTextArea @bind-Value="ticket.Issue" Name="Issue" Style="width: 100%" Rows="5" />',
    selector: 'textarea[name="Issue"]',
    expectedText: '',
    waitForFn: {
      fn: () => {
        const el = document.querySelector('textarea[name="Issue"]');
        return el && el.getAttribute('rows') === '5';
      },
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/create-ticket',
  },
  {
    name: 'Scenario 8 (New Notification: default message update)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/NewNotification.razor'),
    search: 'private BlazorClient.Notification notificationModel = new() { Date = DateTime.Now };',
    replaceWith: 'private BlazorClient.Notification notificationModel = new() { Date = DateTime.Now, Message = "You have a new notification!" };',
    selector: 'textarea[name="Message"]',
    expectedText: 'You have a new notification!',
    waitForFn: {
      fn: () => {
        const el = document.querySelector('textarea[name="Message"]');
        return el && el.value === 'You have a new notification!';
      },
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/new-notification',
  },
  {
    name: 'Scenario 9 (Home Page: text Hello World → Welcome to HotReload Benchmark!)',
    filePath: path.resolve(__dirname, '../clients/blazor/Pages/Home.razor'),
    search: 'hello world',
    replaceWith: '<h1>Welcome to HotReload Benchmark!</h1>',
    selector: 'h1',
    expectedText: 'Welcome to HotReload Benchmark!',
    url: 'http://localhost:5000/',
  },
  {
    name: 'Scenario 10 (Layout/NavMenu: background color #ffffff → #007ACC)',
    filePath: path.resolve(__dirname, '../clients/blazor/Layout/NavMenu.razor'),
    search: '<RadzenSidebar Style="width: 220px; height: 100vh; position: fixed;">',
    replaceWith: '<RadzenSidebar Style="width: 220px; height: 100vh; position: fixed; background: #007ACC;">',
    selector: 'div.rz-sidebar',
    expectedText: '',
    waitForFn: {
      fn: () => {
        const el = document.querySelector('div.rz-sidebar');
        return getComputedStyle(el).backgroundColor === 'rgb(0, 122, 204)';
      },
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/',
  },
  {
    name: 'Scenario 11 (Users List: highlight admin users)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Users.razor'),
        search: '<RadzenDataGridColumn TItem="BlazorClient.User" Property="Name" Title="Name" />',
        replaceWith: `<RadzenDataGridColumn TItem="BlazorClient.User" Property="Name" Title="Name">
  <Template Context="user">
    @user.Name
    @if (user.Email.EndsWith("@admin.com"))
    {
      <span class="admin-badge">Admin</span>
    }
  </Template>
</RadzenDataGridColumn>`
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Users.razor'),
        search: '<!-- ADMIN_BADGE_STYLE -->',
        replaceWith: `<style>
.admin-badge { background: #007ACC; color: white; padding: 2px 4px; border-radius: 3px; }
</style>`
      }
    ],
    selector: 'span.admin-badge',
    expectedText: 'Admin',
    url: 'http://localhost:5000/users',
  },
  {
    name: 'Scenario 12 (Orders List: add variant grids Qty & PID)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Orders.razor'),
        search: '</RadzenDataGrid>',
        replaceWith: `</RadzenDataGrid>

<!-- Variant: Qty header -->
<RadzenDataGrid Data="orders" TItem="BlazorClient.Order" AllowPaging="true" AllowFiltering="true" AllowSorting="true">
  <Columns>
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="Id" Title="ID" />
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="ProductId" Title="Product ID" />
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="Quantity" Title="Qty" />
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="Total" Title="Total" />
  </Columns>
</RadzenDataGrid>

<!-- Variant: PID header -->
<RadzenDataGrid Data="orders" TItem="BlazorClient.Order" AllowPaging="true" AllowFiltering="true" AllowSorting="true">
  <Columns>
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="Id" Title="ID" />
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="ProductId" Title="PID" />
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="Quantity" Title="Quantity" />
    <RadzenDataGridColumn TItem="BlazorClient.Order" Property="Total" Title="Total" />
  </Columns>
</RadzenDataGrid>`
      }
    ],
    waitForFn: {
      fn: () => Array.from(document.querySelectorAll('.rz-column-title-content')).some(el => el.textContent.trim() === 'Qty'),
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/orders',
  },
  {
    name: 'Scenario 13 (Orders List: add Actions column)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Orders.razor'),
        search: '@inject BlazorClient.ApiClient Api',
        replaceWith: '@inject BlazorClient.ApiClient Api\n<!-- NAV_MANAGER_PLACEHOLDER -->'
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Orders.razor'),
        search: '@code {',
        replaceWith: '@code {\n    <!-- VIEW_ORDER_PLACEHOLDER -->'
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Orders.razor'),
        search: '<RadzenDataGridColumn TItem="BlazorClient.Order" Property="Total" Title="Total" />',
        replaceWith: `<RadzenDataGridColumn TItem="BlazorClient.Order" Property="Total" Title="Total" />
  <RadzenDataGridColumn TItem="BlazorClient.Order" Title="Actions">
    <Template Context="order">
      <RadzenButton Text="View" Click="@((args) => ViewOrder(order.Id))" Style="margin-right: 4px" />
    </Template>
  </RadzenDataGridColumn>`
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Orders.razor'),
        search: '<!-- NAV_MANAGER_PLACEHOLDER -->',
        replaceWith: '@inject NavigationManager NavigationManager'
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/Orders.razor'),
        search: '<!-- VIEW_ORDER_PLACEHOLDER -->',
        replaceWith: `private void ViewOrder(int id)
    {
        NavigationManager.NavigateTo($"/orders/{id}");
    }`
      }
    ],
    selector: 'button',
    expectedText: 'View',
    waitForFn: {
      fn: () => Array.from(document.querySelectorAll('button')).some(el => el.textContent.trim() === 'View'),
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/orders',
  },
  {
    name: 'Scenario 14 (Create Ticket Form: change Issue label, add placeholder, rename Submit button)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/CreateTicket.razor'),
        search: '<RadzenLabel Text="Issue" />',
        replaceWith: '<RadzenLabel Text="Description" />'
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/CreateTicket.razor'),
        search: '<RadzenTextArea @bind-Value="ticket.Issue" Name="Issue" Style="width: 100%" />',
        replaceWith: '<RadzenTextArea @bind-Value="ticket.Issue" Name="Issue" Style="width: 100%" placeholder="Describe the issue here..." />'
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/CreateTicket.razor'),
        search: '<RadzenButton Text="Create Ticket" ButtonType="ButtonType.Submit" Style="margin-top: 16px" />',
        replaceWith: '<RadzenButton Text="Submit Ticket" ButtonType="ButtonType.Submit" Style="margin-top: 16px" />'
      }
    ],
    selector: 'textarea[name="Issue"]',
    expectedText: '',
    waitForFn: {
      fn: () => {
        const el = document.querySelector('textarea[name="Issue"]');
        const btn = document.querySelector('button[type="submit"]');
        return el?.getAttribute('placeholder') === 'Describe the issue here...' && btn?.textContent.trim() === 'Submit Ticket';
      },
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/create-ticket',
  },
  {
    name: 'Scenario 15 (Create Ticket Form: add Priority dropdown)',
    patches: [
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/CreateTicket.razor'),
        search: '<RadzenRequiredValidator Component="Issue" Text="Issue is required" />',
        replaceWith: `<RadzenRequiredValidator Component="Issue" Text="Issue is required" />
<RadzenLabel Text="Priority" />
<RadzenDropDown Data="priorities" @bind-Value="ticket.Priority" Name="Priority" Style="width: 100%" />
<RadzenRequiredValidator Component="Priority" Text="Priority is required" />`
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/CreateTicket.razor'),
        search: 'private List<BlazorClient.Customer> customers = new();',
        replaceWith: `private List<BlazorClient.Customer> customers = new();
private List<string> priorities = new() { "Low", "Medium", "High" };`
      },
      {
        filePath: path.resolve(__dirname, '../clients/blazor/Pages/CreateTicket.razor'),
        search: 'customers = await Api.GetCustomersAsync();',
        replaceWith: `customers = await Api.GetCustomersAsync();
ticket.Priority = priorities[1];`
      }
    ],
    selector: '.rz-dropdown-label',
    expectedText: 'Medium',
    waitForFn: {
      fn: () => {
        const labels = Array.from(document.querySelectorAll('.rz-dropdown-label'));
        return labels[1]?.textContent.trim() === 'Medium';
      },
      args: undefined,
      timeout: 10000
    },
    url: 'http://localhost:5000/create-ticket',
  },
  // Add more Blazor scenarios here if needed
];
