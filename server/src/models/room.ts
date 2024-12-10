import mongoose, { Document, Schema } from "mongoose";

export interface IMessage {
  userName: string;
  message: string;
  timeStamp: string;
}

export interface IRoom extends Document {
  roomName: string;
  messages: IMessage[];
}

const messagesSchma: Schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
});

const roomSchema: Schema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  messages: [messagesSchma],
});

export default mongoose.model<IRoom>("Rooms", roomSchema);
