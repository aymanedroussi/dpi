
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nom: String,
  email: String,
  password:String,
  role:String,
  active:Boolean
  
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)