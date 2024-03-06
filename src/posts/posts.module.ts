import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/Post.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User, userSchema } from 'src/schemas/User.schema';

import { LogService } from '../log/log.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostSchema,
            },
            {
                name: User.name,
                schema: userSchema,
            },
        ]),
    ],
    controllers: [PostsController],
    providers: [PostsService, LogService],
})
export class PostsModule { }