const { model, Schema, models } = require('mongoose');

const serviceSchema = new Schema({
  cost: {
    type: Number,
    required: [true, 'El campo de costo es requerido'],
  },
  initLoc: {
    type: String,
    required: [true, 'El campo de inicio de recorrido es requerido'],
  },
  finalLoc: {
    type: String,
    required: [true, 'El campo de destino es requerido'],
  },
  date: {
    type: String,
    required: [true, 'El campo de fecha del servicio es requerido'],
  },
  hour: {
    type: String,
    required: [true, 'El campo de hora del servicio es requerido'],
  },
  rating: {
    type: Number,
  },
  comments: {
    type: String,
  },
  servStat: {
    type: String,
  },
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