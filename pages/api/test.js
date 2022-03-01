// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../util/dbConnect"
import User from '../../models/User'
export default async function handler(req, res) {
  await dbConnect();
  const pets = await User.find({}) /* find all the data in our database */
  res.status(200).json({ success: true, data: pets })
 
}
