const { model, Schema, models } = require('mongoose');

const plateRegex = /^([A-Z]{3}\d{3,4})$/;

const motorcycleSchema = new Schema({
  plateNum: {
    type: String,
    required: [ true, "El número de placa es requerido" ],
    match: [plateRegex, 'Invalid plate number'],
    validate: [
      {
        validator(plateNum) {
          return models.Tow.findOne({ plateNum })
            .then(tow => {
              console.log(tow);
              return !tow;
            })
            .catch(err => false);
        },
        message: 'Bike plate number already exists'
      }
    ] 
  },
  brand: String,

  weight: {
    type: String,
    required: [ true, "El peso es requerido" ],
  },
  type: {
    type: String,
    required: true,
  },
  cc: String,

  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'Client',
    required: true,
  },
  serviceIds: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  },
  photo: String,
},
{
  timestamps: true,
});

const Motorcycle = model('Motorcycle', motorcycleSchema);

module.exports = Motorcycle;
