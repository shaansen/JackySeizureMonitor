const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  date: { type: String },
});

mongoose.model("event", EventSchema);
