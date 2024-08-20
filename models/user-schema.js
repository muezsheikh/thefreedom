import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// import

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  userRole: { type: String, required: true }, // 'admin', 'member', etc.
})

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports =  User
