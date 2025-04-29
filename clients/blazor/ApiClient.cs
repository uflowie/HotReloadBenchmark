using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BlazorClient
{
    public class ApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };

        public ApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        // USERS
        public async Task<List<User>> GetUsersAsync() =>
            await _httpClient.GetFromJsonAsync<List<User>>("/users/", _jsonOptions);
        public async Task<User> CreateUserAsync(User user) =>
            await PostJson<User, User>("/users/", user);

        // PRODUCTS
        public async Task<List<Product>> GetProductsAsync() =>
            await _httpClient.GetFromJsonAsync<List<Product>>("/products/", _jsonOptions);
        public async Task<Product> CreateProductAsync(Product product) =>
            await PostJson<Product, Product>("/products/", product);

        // ORDERS
        public async Task<List<Order>> GetOrdersAsync() =>
            await _httpClient.GetFromJsonAsync<List<Order>>("/orders/", _jsonOptions);
        public async Task<Order> CreateOrderAsync(Order order) =>
            await PostJson<Order, Order>("/orders/", order);

        // INVENTORY
        public async Task<List<InventoryItem>> GetInventoryAsync() =>
            await _httpClient.GetFromJsonAsync<List<InventoryItem>>("/inventory/", _jsonOptions);
        public async Task<InventoryItem> CreateInventoryItemAsync(InventoryItem item) =>
            await PostJson<InventoryItem, InventoryItem>("/inventory/", item);

        // CUSTOMERS
        public async Task<List<Customer>> GetCustomersAsync() =>
            await _httpClient.GetFromJsonAsync<List<Customer>>("/customers/", _jsonOptions);
        public async Task<Customer> CreateCustomerAsync(Customer customer) =>
            await PostJson<Customer, Customer>("/customers/", customer);

        // SUPPLIERS
        public async Task<List<Supplier>> GetSuppliersAsync() =>
            await _httpClient.GetFromJsonAsync<List<Supplier>>("/suppliers/", _jsonOptions);
        public async Task<Supplier> CreateSupplierAsync(Supplier supplier) =>
            await PostJson<Supplier, Supplier>("/suppliers/", supplier);

        // INVOICES
        public async Task<List<Invoice>> GetInvoicesAsync() =>
            await _httpClient.GetFromJsonAsync<List<Invoice>>("/invoices/", _jsonOptions);
        public async Task<Invoice> CreateInvoiceAsync(Invoice invoice) =>
            await PostJson<Invoice, Invoice>("/invoices/", invoice);

        // PAYMENTS
        public async Task<List<Payment>> GetPaymentsAsync() =>
            await _httpClient.GetFromJsonAsync<List<Payment>>("/payments/", _jsonOptions);
        public async Task<Payment> CreatePaymentAsync(Payment payment) =>
            await PostJson<Payment, Payment>("/payments/", payment);

        // TICKETS
        public async Task<List<Ticket>> GetTicketsAsync() =>
            await _httpClient.GetFromJsonAsync<List<Ticket>>("/tickets/", _jsonOptions);
        public async Task<Ticket> CreateTicketAsync(Ticket ticket) =>
            await PostJson<Ticket, Ticket>("/tickets/", ticket);

        // NOTIFICATIONS
        public async Task<List<Notification>> GetNotificationsAsync() =>
            await _httpClient.GetFromJsonAsync<List<Notification>>("/notifications/", _jsonOptions);
        public async Task<Notification> CreateNotificationAsync(Notification notification) =>
            await PostJson<Notification, Notification>("/notifications/", notification);

        // Helper for POST
        private async Task<TResponse> PostJson<TRequest, TResponse>(string url, TRequest data)
        {
            var response = await _httpClient.PostAsJsonAsync(url, data, _jsonOptions);
            response.EnsureSuccessStatusCode();
            var stream = await response.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync<TResponse>(stream, _jsonOptions);
        }
    }

    // DTOs matching OpenAPI
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }
    }
    public class InventoryItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Stock { get; set; }
    }
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
    public class Supplier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
    }
    public class Invoice
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
    public class Payment
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public decimal Amount { get; set; }
        public string Method { get; set; }
    }
    public class Ticket
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Issue { get; set; }
        public string Status { get; set; }
    }
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}
