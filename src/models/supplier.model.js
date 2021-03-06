const {model, Schema, models} = require('mongoose');
const bcrypt = require('bcrypt');

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El campo nombre es requerido'],
  },
  email: {
    type: String,
    required: true,
    match: [emailRegex, 'Email invalido'],
    validate: {
      async validator(email) {
        try {
          const supplier = await models.Supplier.findOne({ email });
          return !supplier;
        } catch (err) {
          return false;
        }
      },
      message: 'El email ya existe',
    },
  },
  password: {
    type: String,
    required: [true, 'El campo contraseña es requerido'],
  },
  phoneNum: {
    type: String,
    required: [true, 'El campo número de teléfono es requerido'],
    minlength: [10, 'Tiene que ser un número de celular'],
  },
  towIDs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Tow' }],
  },
  photo: {
    type: String,
  },
  emailIsConfirmed: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: Number,
    default: Math.random(),
  }
},
{
  timestamps: true,
});

supplierSchema.pre('save', async function () {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const Supplier = model('Supplier', supplierSchema);

module.exports = Supplier;
