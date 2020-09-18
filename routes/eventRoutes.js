const passport = require("passport");
const requireLogin = require("../middleware/requireLogin");
const mongoose = require("mongoose");

const Event = mongoose.model("event");

module.exports = (app) => {
  app.get("/api/event", requireLogin, (req, res) => {
    Event.find({ _user: req.user._id }, function (err, events) {
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

  app.delete("/api/event/:id", requireLogin, (req, res) => {
    const { id } = req.params;
    Event.findByIdAndDelete(id, function (err, data) {
      res.send(data);
    });
  });
};
