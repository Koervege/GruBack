const {model, Schema, models} = require('mongoose');

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'El campo nombre es requerido'],
	},
	email: {
		type: String,
		match: [emailRegex, 'Email invalido'],
		validate: [
			{
				validator(email) {
					return models.User.findOne({ email })
						.then((user) => {
							console.log(user);
							return !user;
						})
						.catch((err) => false);
				},
				message: 'email ya existe',
			},
		],
	},
	password: {
		type: String,
		required: true,
	},
	phoneNum: {
		type: String,
		required: true,
		min: [10, 'Ingrese un número de celular'],
		max: [10, 'Ingrese un número de celular'],
	},
	bikeIDs: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Motorcycle' }],
	},
  photo: String,
},
{
  timestamps: true,
});

userSchema.pre('save', async function () {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User = model('User', userSchema);

module.exports = User;
