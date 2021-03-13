const { model, Schema, models } = require('mongoose');

const serviceSchema = new Schema({
  cost: Number,
  initLoc: String,
  finalLoc: String,
  date: String,
  hour: String,
  rating: Number,
  comments: String,
  servStat: String,
  bikeIDs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Motorcycle' }],
  },
  towIDs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Tow' }],
  },
},{
  timestamps: true,
}
);

const Service = model('Service', serviceSchema);

module.exports = Service;