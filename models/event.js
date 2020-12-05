const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  date: { type: Schema.Types.Date },
  notes: { type: String },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("event", EventSchema);
