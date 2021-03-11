const {model, Schema, models} = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phoneNum: String,
  bikeIDs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Motorcycle'}],
  },
  photo: String,
}, {
  timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;
