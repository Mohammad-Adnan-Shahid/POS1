# Sheikh Ahmed Mobile POS — Project Features

## Project overview

Sheikh Ahmed Mobile POS is a Windows desktop application for managing a mobile
phone shop's retail and wholesale operations. It brings sales, products, stock,
supplier purchases, customer credit, expenses, and business reports into one app.

The application uses Electron, React, TypeScript, and a local SQLite database.
Core shop operations can run without an internet connection. Google Drive backup
requires an internet connection and a configured Google account.

This document describes features present in the current source code. For
installation and configuration, see [DEVELOPER-SETUP.md](./DEVELOPER-SETUP.md).

## Features at a glance

| Module | What it helps the shop do |
| --- | --- |
| Dashboard | Review sales, activity, low stock, and outstanding balances |
| POS | Complete retail and wholesale sales |
| Sales | Find previous sales, inspect details, and reprint receipts |
| Products | Maintain the catalogue, categories, and selling prices |
| Purchases | Record supplier purchases, returns, and payments |
| Stock | Track quantities, adjustments, reorder needs, and stock value |
| Customers | Maintain customer profiles and credit ledgers |
| Expenses | Record and categorize shop spending |
| Staff | Manage staff accounts, PINs, and individual permissions |
| Reports | Analyze sales, purchases, debt, expenses, and profit |
| Day Close | Review and print consolidated retail sales for a period |
| Settings | Configure the business, printer, receipts, roles, and backup |

## 1. PIN login and access permissions

- Staff sign in using a six-digit PIN. PINs are stored as bcrypt hashes.
- A fresh seeded installation includes an Owner account with PIN `123456`.
  Change this PIN before using the app for real shop operations.
- Roles define which features a staff member can access. Authorized users can
  create roles and configure their permissions.
- Individual permission overrides allow a staff member's access to differ from
  their role's default permissions.
- Navigation and protected pages follow the user's permissions. Backend handlers
  also check permissions for restricted operations.
- The `view_all_data` permission controls access to shop-wide data. Several sales,
  billing, dashboard, and reporting queries show only the current user's records
  when this permission is absent.

## 2. Dashboard

The dashboard provides an overview of the shop's activity:

- Today's sales amount and order count, with trend comparisons.
- Low-stock products and supplier information for replenishment.
- Supplier payables and customer receivables for users with shop-wide access.
- Sales charts, including an hourly view.
- Recent activity and backup status.

The information shown depends on the signed-in user's access permissions.

## 3. Retail and wholesale point of sale

The POS screen supports the shop's checkout workflow:

- Switch between retail and wholesale pricing.
- Search products by name, brand, model, SKU, category, or shortcut text.
- Browse products by category and add them to the cart.
- Change quantities, remove items, and attach item notes.
- Apply a percentage discount or a fixed rupee discount.
- Select a customer and place a sale on credit when appropriate.
- Hold a cart and recall it later. Held carts are saved in local browser storage.
- Record payment using Cash, Card, Bank Transfer, JazzCash, EasyPaisa, or Credit.
- View a completed sale's receipt and send it to the configured thermal printer.

Checkout creates the order and bill, reduces stock, and creates a customer ledger
entry for a credit sale. These database changes run together in a transaction.
Stock availability and customer credit limits are checked during checkout.

**Payment methods are recorded in the app.** Selecting Card, JazzCash, EasyPaisa,
or Bank Transfer does not itself charge an account or verify an external payment.

## 4. Sales history

- Browse recorded sales and filter by date and order status.
- View Open, Billed, and Cancelled orders.
- Search sales and use pagination to browse larger lists.
- Inspect order items, totals, customer details, and receipt information.
- Preview and reprint receipts for billed sales.
- Use available cancellation and void controls according to permissions, with
  reasons recorded for relevant actions.

## 5. Product catalogue

- Add and edit products, with controls for removing products from active use.
- Store product name, category, brand, model, SKU, unit, description, image URL,
  and supplier association.
- Maintain retail selling price, wholesale selling price, and cost price.
- Search and filter products by category and supplier.
- Manage product categories.
- Import and export catalogue data as CSV.
- Apply bulk percentage price changes to retail or wholesale prices.
- View product buying-price history from supplier purchases.

A fresh database includes a starter catalogue covering mobile phones and related
products, such as tablets, wearables, chargers, cases, and accessories.

## 6. Suppliers and purchases

The Purchases screen manages supplier relationships and incoming stock:

- Maintain supplier names, phone numbers, addresses, email, tax identifiers,
  and notes.
- View products supplied, purchase history, outstanding amounts, and ledgers.
- Create purchases with product quantities, buying prices, discounts, and
  payment information.
- Increase stock when purchases are recorded.
- Record supplier payments and track remaining purchase balances.
- Record purchase returns, including partial returns, and reduce stock.
- Account for purchase discounts when calculating the financial value of returns.

This connects supplier purchasing, inventory movement, and supplier balances.

## 7. Inventory and stock control

- View current stock levels by product.
- Add stock entries and review movement history.
- Record positive or negative stock adjustments with a reason.
- Filter history by date, product, and supplier.
- Configure product reorder levels and review suggested replenishment orders.
- Review stock valuation based on product costs.
- Track stock changes created by purchases, sales, and purchase returns.
- Configure whether sales can take stock below zero.

Suggested orders help staff plan replenishment; they do not automatically send
purchase orders to suppliers.

## 8. Customers and credit sales

- Maintain customer names, phone numbers, email, addresses, and notes.
- Set optional customer credit limits.
- Create customer credit sales with products and quantities.
- View customer order history and ledger entries with running balances.
- Record customer payments and monitor remaining receivables.
- Deactivate customers while preserving their existing ledger records.

Credit sales affect both stock and the customer ledger. Credit limits are checked
when creating a credit sale.

## 9. Expense management

- Record shop expenses with a description, amount, date, category, and notes.
- Add and manage expense categories.
- Edit or delete expense records when permitted.
- Filter expenses by date.
- Review category totals in reports and include expenses in profit calculations.

## 10. Staff management and audit log

- Create staff accounts and assign roles.
- Update staff details and change PINs.
- Activate or deactivate accounts.
- Configure individual permission overrides.
- Review recorded staff activity.
- Inspect the Audit Log for recorded actions, including the user, action,
  entity, details, and time.

These features help the owner control access and trace recorded changes.

## 11. Reports and analytics

Reports support date presets and custom periods. Available sections include:

| Report | Information provided |
| --- | --- |
| Sales | Sales totals, daily sales charts, and top-selling products |
| Purchases | Product buying prices and purchase analysis |
| Suppliers | Outstanding supplier balances and payable aging |
| Customers | Outstanding customer balances and receivable aging |
| Expenses | Expense totals and category breakdowns |
| Profit & Loss | Revenue, cost of goods sold, expenses, gross profit, and net profit |

CSV export is available for top products, purchase analysis, supplier aging,
customer aging, and expense breakdowns.

The current Profit & Loss calculation uses sold quantities multiplied by the
products' stored cost prices. Changing those cost prices can affect historical
profit figures.

## 12. Day Close

- Select today, yesterday, the last seven days, or a custom date range.
- Review retail sale count, quantities sold, subtotal, discounts, and total.
- View totals grouped by recorded payment method.
- Print a consolidated thermal receipt containing the retail products sold.

Day Close is a retail summary and printing feature. Wholesale sales are excluded,
and printing the summary does not lock the day or reconcile a cash drawer.

## 13. Business settings and receipt printing

- Configure the business name, address, phone number, and NTN.
- Customize receipt header and footer text.
- Choose the default sale type and configure stock behavior.
- Select a supported thermal printer model and the Windows printer queue name.
- List Windows printers, test the connection, and print a sample receipt.
- Print individual sale receipts and consolidated retail receipts with the logo
  and business details.

Printing uses the Windows Print Spooler. An 80 mm thermal printer must be installed
in Windows, and the configured name must match its Windows queue name. Network
printers also use their installed Windows queue.

## 14. Local data and Google Drive backup

Shop records are stored locally in SQLite under:

```text
%APPDATA%\sheikh-ahmed-mobile-pos\sheikh-ahmed-mobile.db
```

Backup features include:

- Manual database backup using **Back Up Now**.
- Google Drive connection using a Desktop OAuth client ID and secret.
- Zipped uploads to the `SheikhAhmedMobilePOS-Backups` Drive folder.
- Backup status, local backup listing, and an option to open the backup folder.
- Encrypted storage of saved OAuth tokens.
- An hourly backup schedule from 06:00 through 23:00, using the machine's local
  time, while the app is running and Drive is connected.
- Cleanup of local backups older than 30 days during scheduled backup runs.

The current scheduled worker skips backup creation when Drive is disconnected.
A manual backup can still create a local database copy even if its Drive upload
fails. Restoration is a manual file replacement procedure described in the setup
guide.

## 15. Windows distribution and clean client setup

- The project builds a Windows NSIS installer with a selectable installation
  directory, Desktop shortcut, and Start-menu shortcut.
- Uninstallation is configured to retain the application's user data.
- `npm run dev` starts Vite and launches the Electron development app.
- `npm run build` type-checks and builds the application.
- `npm run dist:clean` creates an installer that excludes the bundled database
  snapshot. A new profile receives the built-in starter catalogue and default
  Owner login on first launch.
- Snapshot-based build commands are also available. Their data-handling behavior
  is explained in the setup guide and should be reviewed before client delivery.

The project includes Playwright tests that launch the real Electron application
with isolated test databases to verify major shop workflows.

## Example daily workflow

1. A staff member logs in with their PIN and reviews the dashboard.
2. Incoming goods are recorded as supplier purchases, increasing stock.
3. Retail and wholesale sales are completed through POS.
4. Credit sales update customer balances; later payments are recorded in ledgers.
5. Shop expenses and supplier payments are entered as they occur.
6. The owner reviews reports and low-stock suggestions.
7. Staff print the Day Close retail summary and verify backup status.
