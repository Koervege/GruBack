const { model, Schema, models } = require('mongoose');

const serviceSchema = new Schema({
  cost: {
    type: Number,
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
  bikeID: {
    type: Schema.Types.ObjectId, 
    ref: 'Motorcycle',
    required: true,
  },
  towID: {
    type: Schema.Types.ObjectId, 
    ref: 'Tow',
    required: true,
  },
},{
  timestamps: true,
}
);

const Service = model('Service', serviceSchema);

module.exports = Service;