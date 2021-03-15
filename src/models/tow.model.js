const {Schema, model, models} = require('mongoose');

const plateRegex = /^([A-Z]{3}\d{3,4})$/;

const towSchema = new Schema({
  plateNum: {
    type: String,
    required: [true, 'The plateNum field is mandatory'],
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
        message: 'tow plate number already exists'
      }
    ] 
  },
  status: Boolean,
  brand: {
    type: String,
    require: true,
  },
  capacity: {
    type: String,
    require: true,
  },
  photo: String,
  serviceIds: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  }

}, {
  timestamps: true,
});

const Tow = model('Tow', towSchema);

module.exports = Tow;