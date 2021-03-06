const {Schema, model, models} = require('mongoose');

const plateRegex = /^([A-Z]{3}\d{3})$/;

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
  status: {
    type: Boolean,
    default: false,
  },
  brand: {
    type: String,
    require: true,
  },
  capacity: {
    type: String,
    require: true,
  },
  supplierID: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      require: true,
  },
  photo: String,
  serviceIDs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  }

}, {
  timestamps: true,
});

const Tow = model('Tow', towSchema);

module.exports = Tow;