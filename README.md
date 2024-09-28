# Qikserve's Dashboard Menu challenge

  

## Overview

  

This project is a front-end challenge developed using React, TypeScript, and Vite.
  

## Installation

  

To set up this project locally, follow these steps:

  

1.  **Clone the repository:**

```bash

git clone https://github.com/joaodantas91/dashboard-large-menu

```

2.  **Navigate into the project directory:**

```bash

cd yourproject

```

3.  **Install dependencies:**

```bash

npm install

```

4. **Create the .env file:**

In the root of your project, create a .env file to define your environment variables:

```bash

touch .env

```

Then, open the .env file and add the following content:


```bash

VITE_ENV=development

```

This will set up the environment variable needed to determine the environment (development or production).

1.  **Start the development server:**

```bash

npm run dev

```

  

The application will be available at [http://localhost:5173/](http://localhost:5173/) by default.

  

## Usage

  

To start using the application:

  

1.  **Run the Development Server:**

```bash

npm run dev

```

2.  **Build for Production:**

```bash

npm run build

```

This command creates a production-ready build in the `dist` directory.

  

3.  **Preview Production Build:**

```bash

npm run preview

```

This command serves the production build locally for testing.
  

## Process and Choices

The first solution I thought of was to create a new boolean state (queued-action) to check if there is an incrementItem waiting to be started, but this didn't completely solve the problem because, when clicking too many times, the function calls interfered with the state, for example, while the fifth call is running and sets the queued-action to true, the second one finishes and sets the queued-action to false.

That's why I came up with the idea of creating an incremental queued-action, in which I can increment every time a request is started and decrement every time a request is completed, so that I can control the button to be deactivated as long as the queuedActions is greater than zero.

Another enhancement I made was to change the arbitrary 3 seconds to check the calculatingBasketInApi and added a promise that checks every 0.1s if the call has been completed and, after that, immediately starts the next call, so that it now depends exclusively on the completion time of the request

