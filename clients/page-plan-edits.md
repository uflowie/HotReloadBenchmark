# Page Plan Edit Scenarios

A list of simple code edits to apply to each page/component to trigger hot reload for benchmarking.

1. **Users List**: change header `<h1>Users List</h1>` to `<h1>All Users</h1>`.
2. **Products List**: adjust price column to prepend `$` (e.g., `${{price}}`).
3. **Orders List**: add CSS class `highlight-row` to odd rows in the orders table.
4. **Inventory List**: change default page size from `10` to `15` in pagination settings.
5. **Customers List**: rename table column `Email` to `Contact Email` in the template.
6. **Add Supplier Form**: add `placeholder="Enter supplier name"` attribute to the name input.
7. **Add Payment Form**: add new option `PayPal` to the payment method `<select>` dropdown.
8. **Create Ticket**: change `<textarea rows="3">` to `<textarea rows="5">` to enlarge the input.
9. **New Notification**: update default message text to `You have a new notification!` in the component.
10. **Home Page**: modify welcome text from `Hello world` to `Welcome to HotReload Benchmark!`.
11. **Layout/NavMenu**: change nav background color from `#ffffff` to `#f0f0f0` in global styles.
12. **User Profile Page**: update avatar border radius to `50%` for round images.
13. **Products List**: truncate product description to 100 characters using substring method.
14. **Orders List**: change row hover color to `#eef` in CSS.
15. **Inventory List**: change low-stock badge color to red (`.badge-low { background: red; }`).
16. **Customers List**: add zebra-striping with class `stripe-row` on alternating rows.
17. **Add Invoice Form**: change submit button text from `Submit` to `Create Invoice`.
18. **Add Supplier Form**: add `maxlength="50"` attribute to the name input.
19. **Add Payment Form**: change currency symbol from `$` to `€` in template.
20. **Create Ticket**: add `placeholder="Describe your issue"` to the textarea.
21. **New Notification**: change displayed date format to `MM/DD/YYYY` in template.
22. **Home Page**: change header text color to `#007ACC` in CSS.
23. **Layout/NavMenu**: reduce nav item padding from `15px` to `10px`.
24. **Users List**: add `placeholder="Search users..."` on search input field.
25. **Products List**: hide the description column using inline style `display:none`.
26. **Orders List**: add a footer row displaying total orders count.
27. **Inventory List**: change row-stripe color to `#f9f9f9` in CSS.
28. **Customers List**: convert email text to a `mailto:` link.
29. **Add Supplier Form**: add `autofocus` attribute to the first input field.
30. **Home Page**: add footer text ` 2025 HotReload Benchmark`.
31. **Products List**: italicize product name in the table.
32. **Orders List**: add border around the orders table via CSS.
33. **Inventory List**: display units in uppercase (e.g., `KG`).
34. **Customers List**: bold customer name column in the grid.
35. **Add Supplier Form**: add labels above each input field.
36. **Add Invoice Form**: set placeholder `0.00` on the amount input.
37. **Add Payment Form**: change submit button color to green.
38. **Create Ticket**: add character counter below textarea.
39. **New Notification**: change date input type to `date`.
40. **Home Page**: change background color to `#fafafa`.
41. **Layout/NavMenu**: adjust logo image size to `40px`.
42. **Breadcrumb Navigation**: add breadcrumb links above page titles.
43. **Side Panel**: collapse side panel by default in CSS.
44. **Footer**: add social media icon links in the footer.
45. **Modal Dialog**: update close icon to `×` instead of `X`.
46. **Error Page**: update error message to `Page not found (404)`.
47. **Login Page**: change button text to `Sign In`.
48. **Signup Page**: change email placeholder to `your@example.com`.
49. **Profile Page**: add `alt` text to the profile image.
50. **Notifications Page**: add quick link icon next to page title.
