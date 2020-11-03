var express = require("express");
var socket = require("socket.io");
const PatchManager = require("./PatchManager");
const { SyncStateRemote } = require("@syncstate/remote-server");
const remote = new SyncStateRemote();
var app = express();
var server = app.listen(8000, function () {
  console.log("listening on port 8000");
});

var io = socket(server);

var patchManager = new PatchManager();

io.on("connection", async (socket) => {
  socket.on("fetchDoc", (path) => {
    const patchesList = patchManager.getAllPatches(1, path);

    if (patchesList) {
      patchesList.forEach((change) => {
        socket.emit("change", path, change);
      });
      // remote.loadPatches(patchesList);
      // socket.emit("loaded", path);
    }
  });

  socket.on("change", (path, change) => {
    change.origin = socket.id;
    remote.processChange(socket.id, path, change);
  });

  const dispose = remote.onChangeReady(socket.id, (path, change) => {
    patchManager.store(1, path, change);
    socket.broadcast.emit("change", path, change);
  });
});
