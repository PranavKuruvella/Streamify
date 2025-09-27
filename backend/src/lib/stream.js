import {StreamChat} from "stream-chat"
import dotenv from "dotenv"

dotenv.config()

const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET

if(!api_key,!api_secret) console.log('Stream API keys r missing')

const streamClient = StreamChat.getInstance(api_key,api_secret)

export const upsertStreamUser = async (userdata) => { // saves the user to stream application
  try {
    if (!userdata || !userdata.id) {
      throw new Error('User ID is required for upserting a Stream user');
    }
    await streamClient.upsertUser(userdata);
    return userdata;
  } catch (error) {
    console.log('error in upsertStreamUser', error);
    throw error;
  }
}

export const generateStreamToken = async (userId)=>{
  try {
    const userIdStr = userId.toString()
    const token = streamClient.createToken(userIdStr)
  } catch (error) {
    console.log('error in generateStreamToken', error);
  }
}