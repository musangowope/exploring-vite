## Custom Plugin Parsing for csv:

This code is a custom Vite plugin that processes CSV files in your project and converts them into JavaScript modules.

```jsx
// PLugin
import {parse} from "csv-parse/sync";

export default () => {
    return {
        name: 'vite:csv',
        async transform(src, id) {
            if(/\.csv$/.test(id)) {
                const records = parse(src, { columns: true })
                return {
                    code: `export default ${JSON.stringify(records)}`
                }
            }
        },
        async handleHotUpdate(context) {
            if(/\.csv$/.test(context.file)) {
                context.server.ws.send({
                    type: 'custom',
                    event: 'csv-update',
                    data: {
                        url: context.file,
                        data: parse(await context.read(), { columns: true })
                    }
                })
                return []
            }
        }
    }
}
```

Add plugin to vite.config.ts:

```jsx
import Csv from './vite-plugin-csv';
import {defineConfig} from "vite";
export default defineConfig({
    plugins: [
        Csv()
    ],
})
```

Let me explain each part:

### 1. **Importing the `csv-parse/sync` Library**

```
import { parse } from "csv-parse/sync";
```

The `csv-parse/sync` package provides a function (`parse`) that can synchronously parse CSV (Comma Separated Values) content into JavaScript objects. The plugin uses this to convert the contents of a CSV file into a format that JavaScript can work with.

### 2. **Defining and Exporting the Plugin**

```jsx
export default () => {
    return {
        name: 'vite:csv',
        async transform(src, id) {
```

- The `export default` defines the plugin. It's a function that returns an object representing the plugin.
- The object has a `name` property (in this case, `'vite:csv'`), which identifies the plugin.
- The `transform` function is an async function that Vite calls whenever it processes a module.

### 3. **Checking for CSV Files**

```jsx

if (/\.csv$/.test(id)) {
```

This line checks if the `id` (the file path being transformed) ends with `.csv`. If the file is a CSV file, the following logic will run. The regular expression `/\.csv$/` tests if the file path matches the `.csv` file extension.

### 4. **Parsing the CSV File**

```jsx
const records = parse(src, { columns: true });
```

If the file is a CSV, the `parse` function is used to parse the CSV content (`src`) into an array of objects, where each row becomes an object. The option `{ columns: true }` means that the first row in the CSV is treated as the header, and the subsequent rows become objects with properties matching the column names.

### 5. **Returning Transformed Code**

```jsx
return {
    code: `export default ${JSON.stringify(records)}`
};
```

Once the CSV is parsed into `records`, this line converts the resulting array of objects into a JSON string using `JSON.stringify(records)`. The plugin then returns an object with the `code` property, where the code is a JavaScript module that exports the parsed CSV as the default export.

This plugin transforms any `.csv` file into a JavaScript module that exports an array of objects representing the CSV content. For example, if you have a CSV file like this:

```

name,age
John,30
Jane,25
```

The transformed output would be:

```jsx
export default [
  { "name": "John", "age": "30" },
  { "name": "Jane", "age": "25" }
];
```

This way, you can directly import CSV files into your Vite project as JavaScript modules.

On the client side, simply import the csv data and insert it into the dom

```jsx
// main.ts
import products from './products.csv'

const insertCsvToElement = (data: []) => {
    const element = document.querySelector('pre')
    if(element) {
        element.textContent = JSON.stringify(data)
    }
}

insertCsvToElement(products)
```

## Hot module Replacement with `handleHotUpdate`()

1. **Function Purpose**:
   The `handleHotUpdate` function is designed to handle Hot Module Replacement (HMR) for `.csv` files in a Vite environment. When a `.csv` file is modified, this function ensures that the browser is notified and updated with the latest file contents without needing a full page reload.
2. **`context.file`**:
    - This contains the path of the file that has been modified.
    - The function checks if the updated file is a `.csv` file by using the regular expression `/\.csv$/`. If the file is a `.csv` file, the function proceeds; otherwise, it does nothing.
3. **`context.read()`**:
    - Reads the contents of the modified file asynchronously.
    - `await context.read()` fetches the file's latest contents.
4. **`parse()`**:
    - After reading the file, the `csv-parse` library is used to parse the CSV content into a JavaScript object.
    - The `columns: true` option tells `csv-parse` to treat the first row of the CSV as the header and map the subsequent rows to objects using the column names.
5. **`context.server.ws.send()`**:
    - This sends a custom WebSocket message to the client (the browser). WebSocket allows real-time communication between the server and the client.
    - The message has the following structure:
        - `type: 'custom'`: This indicates that this is a custom WebSocket message.
        - `event: 'csv-update'`: The name of the custom event, which tells the client that a CSV file has been updated.
        - `data`: The payload of the message, which contains:
            - `url`: The path of the updated CSV file.
            - `data`: The parsed content of the CSV file (an array of objects representing the rows of the CSV).
6. **Return Value**:
    - The function returns an empty array `[]`, which tells Vite's HMR system that no further updates are needed after sending the custom WebSocket message.
    - This effectively overrides Vite's default behavior for HMR when a `.csv` file is modified, ensuring that only the custom WebSocket message is sent.

### Summary:

- **Purpose**: Handle hot updates for `.csv` files by sending a custom WebSocket message to the client with the updated file contents.
- **Steps**:
    1. Check if the updated file is a `.csv`.
    2. Read and parse the updated CSV data.
    3. Send a custom WebSocket message (`csv-update`) with the updated data to the client.
    4. Return an empty array to prevent default HMR actions.

On the client we will have this code to react to the web socket message

```jsx
import products from './products.csv'

const insertCsvToElement = (data: []) => {
    const element = document.querySelector('pre')
    if(element) {
        element.textContent = JSON.stringify(data)
    }
}

insertCsvToElement(products)

if(import.meta.hot) {
 import.meta.hot.on('csv-update', ({ url, data }) => {
     console.log(`[vite] hot updated: ${url}`)
     insertCsvToElement(data)
 })
}

```

- **`if(import.meta.hot)`**:
    - This checks if Hot Module Replacement (HMR) is enabled.
    - `import.meta.hot` is a special object provided by Vite during development when HMR is active. It allows the module to respond to hot updates.
- **`import.meta.hot.on('csv-update', ({ url, data }) => { ... })`**:
    - The `.on()` method sets up a listener for custom HMR events. In this case, it's listening for a `csv-update` event, which is sent from the server-side HMR handler (in `handleHotUpdate`).
    - When a `csv-update` event is detected, the provided callback function is executed. The event contains:
        - `url`: The URL/path of the updated CSV file.
        - `data`: The parsed CSV data, passed as a JavaScript object (this is the result of the CSV parsing done in the server-side `handleHotUpdate` method).
- **Callback Function**:
  When the `csv-update` event occurs, the following happens:
    - **`console.log(`[vite] hot updated: ${url}`)`**:
        - Logs a message to the console indicating that the CSV file located at `url` was hot updated. This helps developers track HMR events in the browser console during development.
    - **`insertCsvToElement(data)`**:
        - This function (`insertCsvToElement`) is responsible for updating the DOM with the new CSV data. The function presumably takes the parsed CSV data (`data`) and inserts it into a specific part of the page.
        - The exact implementation of `insertCsvToElement` isn't shown, but it likely manipulates the DOM to display the updated CSV content to the user.