import mongoose from 'mongoose'
const { Schema } = mongoose;

const Station = mongoose.model('Station', new Schema({
  code: { type: String, unique: true, index: true },
  name: String, lat: Number, lng: Number, zone: String,
}));

const Train = mongoose.model('Train', new Schema({
  number: { type: String, unique: true, index: true },
  name: String, type: String, zone: String,
}));

// Route = schedule. Times are minutes from origin departure.
const stopSchema = new Schema({
  seq: Number, stationCode: String, stationName: String,
  lat: Number, lng: Number,
  km: Number,          // corridor km marker (for congestion / TSR overlap)
  distanceKm: Number,  // from origin
  schedArrMin: Number, schedDepMin: Number, haltMin: Number,
  recoveryMin: { type: Number, default: 0 }, // in-built recovery time in the section ending here
}, { _id: false });

const Route = mongoose.model('Route', new Schema({
  trainNo: { type: String, unique: true, index: true },
  trainName: String, zone: String, corridor: String,
  startTime: String, // HH:MM
  stops: [stopSchema],
}));

const LiveStatus = mongoose.model('LiveStatus', new Schema({
  trainNo: { type: String, unique: true, index: true },
  zone: String, corridor: String,
  lastSeq: Number, lastStationCode: String,
  delayMin: Number, speed: Number, lat: Number, lng: Number, km: Number,
  runStart: Date, // actual/derived origin departure timestamp of this run
  stopDelays: { type: [Number], default: [] }, // actual delay recorded at each crossed stop
  updatedAt: { type: Date, default: Date.now },
}));

// One doc per section crossing: how much delay changed in section (fromSeq -> fromSeq+1)
const History = mongoose.model('History', new Schema({
  trainNo: { type: String, index: true },
  fromSeq: Number, hour: Number, deltaMin: Number,
  date: { type: Date, default: Date.now },
}));

const Event = mongoose.model('Event', new Schema({
  corridor: String, trainNo: { type: String, default: null },
  type: { type: String, enum: ['TSR', 'BLOCK', 'HALT', 'OTHER'], default: 'TSR' },
  fromKm: Number, toKm: Number, penaltyMin: Number, note: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}));

const User = mongoose.model('User', new Schema({
  name: String, organization: String,
  email: { type: String, unique: true }, password: String,
  role: { type: String, enum: ['public', 'staff', 'admin'], default: 'public' },
}));

export { Station, Train, Route, LiveStatus, History, Event, User };
