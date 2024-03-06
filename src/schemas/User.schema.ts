import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';
import { Post } from './Post.schema';

import * as jwt from 'jsonwebtoken'

import { JWT_PRIVATE_KEY } from '../config/configs';

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: true, minlength: 5 })
    password: string;

    @Prop({ required: true, default: false })
    isAdmin: boolean;

    @Prop({ required: false })
    displayName?: string;

    @Prop({ required: false })
    avatarUrl?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings?: UserSettings;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    posts: Post[];

    _id: mongoose.Schema.Types.ObjectId

    generateAuthToken() {
        if (JWT_PRIVATE_KEY) {
            return jwt.sign({ _id: this._id, username: this.username, isAdmin: this.isAdmin },
                JWT_PRIVATE_KEY, { expiresIn: '7d' })
        } else return "invalid secret"
    }
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.loadClass(User);