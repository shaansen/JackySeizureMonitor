const passport = require("passport");
const requireLogin = require("../middleware/requireLogin");
const mongoose = require("mongoose");

const Event = mongoose.model("event");

module.exports = (app) => {
  app.get("/api/event", requireLogin, (req, res) => {
    Event.find({}, function (err, events) {
      res.send(events);
    });
  });

  app.post("/api/event", requireLogin, (req, res) => {
    const { date, notes } = req.body;
    const event = new Event({
      date: date || new Date().toString(),
      notes,
      _user: req.user.id,
    });
    event.save();
    res.send("Confirmed");
  });

  app.delete("/api/event", requireLogin, (req, res) => {
    // console.log("Deleting Event", req, res);
  });
};
