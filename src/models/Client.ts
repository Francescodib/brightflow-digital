import mongoose, { Schema, Model } from 'mongoose';
import type { IClient } from '@/types';

const ClientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    plan: {
      type: String,
      required: [true, 'Plan is required'],
      enum: ['basic', 'premium', 'enterprise'],
      default: 'basic',
    },
    active: {
      type: Boolean,
      default: true,
    },
    servicesUsed: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

export default Client;
