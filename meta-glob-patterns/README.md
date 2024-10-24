## Lazy loading dynamic modules with meta glob

This code is for lazy loading JavaScript modules when a button is clicked. Here's a step-by-step breakdown of how it works:

1. **`import.meta.glob('./modules/*.ts')`:**
    - This is a special syntax used in Vite (a build tool) or similar tools that allow dynamic imports.
    - It tells the system to import all TypeScript (`.ts`) files from the `./modules` directory and make them available for lazy loading.
    - `import.meta.glob` returns an object where the keys are the paths of the files and the values are functions that will dynamically import the modules when called.
2. **`init()` function:**
    - This function is responsible for setting up the event listener that triggers the lazy loading of the modules.
3. **`const button = document.getElementById('lazy-load-button')`:**
    - The script tries to find a button in the DOM with the `id="lazy-load-button"`. If it's not found, the function exits early (`if (!button) return`).
4. **`button.addEventListener('click', ...)`:**
    - An event listener is attached to the button. When the button is clicked, the provided function is executed.
5. **`Object.values(modules).forEach(module => { ... })`:**
    - This line extracts the values (which are the functions returned by `import.meta.glob`) from the `modules` object and iterates over them.
6. **`module().then((data) => { console.log(data); })`:**
    - For each module, it invokes the function to dynamically import the module. Since dynamic imports are asynchronous, this returns a promise.
    - When the promise resolves, the `then` callback is triggered, and the imported module (`data`) is logged to the console.
7. **`init()` call:**
    - Finally, the `init` function is invoked to set up the lazy loading behavior when the button is clicked.