# 🌐 MicroFrontEnd Website Example

This project showcases a microfrontend website built using Vite Federation. It offers a scalable architecture for large-scale web applications and is organized as a mono-repo with several distinct packages.

🌟 **Live demo** : [https://mfe-website-example.vercel.app](https://mfe-website-example.vercel.app)

## 📦 Project Packages

- 🐚 **shell**: 
   - The central unit of the microfrontend system.
   - Responsible for loading layout microfrontend.

- 🖼️ **layout**: 
   - Manages the overall layout of the site.
   - Serves as a common framework for integrating various MFEs.

- ⚛️ **remote-mfe-basic**: 
   - A React module acting as a sample microfrontend content.
   - Dynamically loaded by the shell.

- ⚛️ **remote-mfe-subroutes**: 
   - A React module acting as a sample microfrontend content with sub-routes.
   - The router uses either the path for explicit routing, or memory to manage implicit routing
   - Dynamically loaded by the shell.

- 🔄 **global-store**: 
   - Implements Zustand for state management.
   - Enables state sharing across different MFEs.

## 📚 Libraries Used

- **vite-federation**: A plugin for Vite that enables module federation in a Vite project. [🔗 GitHub Repository](https://github.com/vite-federation/vite-federation)
- **zustand**: A small, fast, and scalable bearbones state-management solution using simplified flux principles. [🔗 GitHub Repository](https://github.com/pmndrs/zustand)
- **Turbo**: Used for managing the mono-repo. [🔗 GitHub Repository](https://github.com/vercel/turbo)

## 📄 Manifest (`manifest.json`)

The `manifest.json` file is crucial for the dynamic configuration and loading of microfrontends.

### Structure

- **`routes`**: Defines routes and their associated content 🛣️.
- **`modules`**: Maps module names to `remoteEntry.js` files for loading MFE bundles 📦.

### Example

```json
{
  "routes": [
    {
      "html": "<span>Hello</span>"
    },
    {
      "path": "/my-path",
      "module": "my-module-A"
    },
    {
      "path": "/composition-default",
      "modules": ["my-module-A", "my-module-B"]
    },
    {
      "path": "/composition-side",
      "composition": "side-by-side",
      "modules": ["my-module-A", "my-module-B", "my-module-C"]
    }
  ],
  "modules": {
    "layout": "/.../remoteEntry.js",
    "my-module-A": "/.../remoteEntry.js",
    "my-module-B": "/.../remoteEntry.js",
    "my-module-C": "/.../remoteEntry.js"
  }
}
```

## ⚙️ Usage Commands

- 🏗️ **Build the Project**: 
  - `yarn build`: Builds all packages.
  - `yarn build:prod`: Builds the website for production.

- 🛠️ **Development Mode**: 
  - `yarn dev`: Runs the shell in development mode.
  - `yarn dev:mfe`: Runs the remote MFE 1 in development mode.
  - `yarn dev:layout`: Runs the layout package in development mode.
  - `yarn dev:store`: Runs the global-store package in development mode.

