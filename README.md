## What is vite?

Vite is a fast, modern build tool for front-end development, designed to enhance the developer experience. It focuses on speed and efficiency, particularly for projects using frameworks like Vue.js, React, and others. Vite's key features include:

- **Instant server start**: Instead of bundling the entire application upfront, Vite starts a development server quickly, serving files as they are requested.
- **Hot Module Replacement (HMR)**: It allows updates to be reflected instantly in the browser, so developers can see changes without needing to refresh the whole page.
- **Optimized builds**: For production, Vite uses Rollup, a highly optimized bundler, and generates a minified and efficient build.
- **Framework agnostic**: Although initially created for Vue, Vite supports React, Svelte, and other frameworks through **plugins**.

I will demo’ing the following (Explore folders to see the detail of each feature):
- Lazy loading dynamic modules with meta glob
- Media Optimization
- Custom vite plugin and hot module reloading