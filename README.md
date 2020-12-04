# Multi User Todo with Undo/Redo

A todo app that syncs adding, deleting and filtering todos across
multiple sessions with Undo and Redo functionality and is
persistent to new connections.

![Multi-User-Todo](public/images/todo-undo-redo.gif)

## Instructions

1.  ### Clone the github repository

```bash
git clone https://github.com/syncstate/multi-user-todo-undo-redo-example.git
```

2. ### Install local dependencies

```bash
# NPM
npm install

# Yarn
yarn install
```

3. ### Run the server

```bash
cd server
node index.js
```

> Runs the server at port 8000 to establish socket connection with the client.

4. ### Run the App

```bash
# NPM
npm start

# Yarn
yarn start
```

> Runs the app in the development mode.

Open <a href="http://localhost:3000" >http://localhost:3000</a> to view it in the browser.
