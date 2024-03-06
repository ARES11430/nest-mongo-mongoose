import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './users/users.module'
import { PostsModule } from './posts/posts.module'

import { MyConfigModule } from './config/config.module'
import { AuthModule } from './auth/auth.module'

import { ENV, MONGO_URI, MONGO_URI_TEST, MONGO_URI_FALLBACK } from './config/configs'

import { Authentication, IsAdmin } from './middlewares/auth.middleware'
import validateObjectId from './middlewares/objectid.validation'

import { UserSController } from './users/users.controller'

import { LogService } from './log/log.service'
import { LogModule } from './log/log.module';

let MONGO: string
if (ENV === 'production') {
  MONGO = MONGO_URI
} else if (ENV === 'development') {
  MONGO = MONGO_URI_TEST
} else MONGO = MONGO_URI_FALLBACK

@Module({
  imports: [MyConfigModule,
    MongooseModule.forRoot(MONGO),
    AuthModule,
    UserModule,
    PostsModule,
    LogModule
  ],

})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication).exclude({ path: 'users/create-user', method: RequestMethod.POST }).forRoutes(UserSController)

    consumer.apply(validateObjectId('id')).forRoutes({ path: 'users/:id', method: RequestMethod.GET })
  }
}