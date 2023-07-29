# FurEverFriend
## Description

FurEverFriend is a fullstack app I developed independently after completing the BootCamp. Using the knowledge gained during the program, I planned and built the app. It serves as a platform to connect dog owners, allowing their dogs to find compatible friends and enabling owners to connect with like-minded individuals. It's a project that combines my technical skills and passion for fostering connections within the dog owner community.


## Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine.

2. Navigate into the project directory and install the dependencies.
cd your_repo_name
```npm install```

3. Setup the database by running the migrations and seeding data.
```npm run knex migrate:latest```
```npm run knex seed:run```



> **Note:** This project uses Auth0 for authentication. If you need to run this project correctly, please contact me to get the `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_AUDIENCE`, and `VITE_AUTH0_CLIENT_ID` environment variables.

## Usage

To start the application, run:

```npm run dev```


Then, navigate to `http://localhost:5173` in your web browser (or the port number displayed in your terminal).

## Testing

You can run the tests for this project by executing:
```npm run test```



