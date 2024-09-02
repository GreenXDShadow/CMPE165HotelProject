# Hotel Project README

Please read this thoroughly to understand how to get things started.  
If you have any questions, reach out to Mj.

## Getting Started with Yarn Package Management

Yarn Package Manager gives you the ability to install packages needed for web development, launch development servers, build projects into production builds, and much more.

**Note:** I wholeheartedly recommend installing Yarn for your package management, but you are certainly welcome to use npm as well as npx.

### How to Install Yarn Globally

#### Linux Environments

1. Update packages and install upgrades:
    ```bash
    sudo apt-get update && sudo apt-get full-upgrade -y
    ```

2. Install npm in order to install Yarn globally:
    ```bash
    sudo apt-get install npm -y
    sudo npm install -g yarn
    ```

#### macOS Environments

1. Install Homebrew (macOS package installer):
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

2. Install Yarn globally:
    ```bash
    brew install yarn
    ```

#### Windows Environments

1. If you do not have WSL/Bash on Windows (recommended), use the link below to install Yarn:
    [Yarn Installation for Windows](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## Getting Started with Frontend

Frontend development is done using Next.js, which is built on React.js.

Here is a breakdown of the directory structure to help you understand where everything goes:

### Directory Structure
hotel
├── .next               # Next.js build output (don't worry about this)
├── node_modules        # Installed npm packages (don't worry about this)
├── public              # Public assets (don't worry about this)
└── src
    ├── components      # Reusable components for different pages
    │   └── button.js   # Example of a reusable button component
    ├── pages           # Pages that must be routed
    │   ├── login
    │   │   ├── page.js         # Login page
    │   │   └── login.css       # Login page styling
    │   └── registration
    │       ├── page.js         # Registration page
    │       └── registration.css # Registration page styling
    ├── page.js            # Home page
    ├── main.css           # Home page styling
    └── globals.css        # Global styling (affects every page when included)

### How to Get It Running

1. **cd** into the `hotel` folder.

2. Run **`yarn install`** (or **`sudo yarn install`** on Unix-based systems) to download packages specified in the `package.json`.

3. Start the development server by running **`yarn dev`** (or **`sudo yarn dev`**). The server will be accessible at **`http://localhost:3000`**.

   - As you code and make updates, it will compile and show you runtime errors/changes as you develop.

**Note:** When making a new page, remember to cd into the pages directory, make a new directory with the name of the page you're making, and make sure the name of the js file you are making is page.js so that the routing knows where to look

**Note:** Also remember that after you make the new page, layout.js needs to be updated in order to reflect the new page being made

**Note:** When you are making a push into the github, please please please remember to include a .gitignore that ignores the node_modules folder. One is already created but feel free to double check

## Getting Started with Backend

Backend development is done with Python Flask, which communicates with SQLAlchemy for a relational database.

- `main.py` will be the main backend code (keeping fewer Python files makes it easier to communicate with the frontend).
- `schema.py` will hold the schemas for SQL tables.

**Note:** If you mess up a schema on the backend and need to restart the whole database, let Mj know for backend purposes.

**Note:** login and registration has been commented for you to help you understand what each thing does in order to figure out how it all works together and communicates with the backend. If you still have questions about it ask Mj.

### How to Get It Running

1. If you do not have Python and pip installed, install them first.

2. Install the required packages:
    ```bash
    pip install -r Requirements.txt
    ```

3. Start the backend server:
    ```bash
    python main.py
    ```

   - As you code and make updates, it will compile and show you runtime errors/changes as you develop.
