const { model, Schema, models } = require('mongoose');

const motorcycleSchema = new Schema({
    plateNum: {
        type: String,
        required: [ true, "El número de placa es requerido" ],
    },
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
        ref: 'User',
        required: true,
    },
    serviceIds: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    },
},
{
    timestamps: true,
});

const Motorcycle = model('Motorcycle', motorcycleSchema);

module.exports = Motorcycle;
