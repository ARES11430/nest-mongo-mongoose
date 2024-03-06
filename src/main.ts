import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

import { LogService } from './log/log.service'

// ! uncaughtException outside express routes
process.on('uncaughtException', exception => {
  console.log('uncaughtException', exception.message)
  process.exit(1)
})

// ! unhandledRejection promises outside express routes
process.on('unhandledRejection', (exception: Error, promise) => {
  console.log('unhandledRejection', exception.message)
  process.exit(1)
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const logService = app.get(LogService)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(5000)

  logService.logger.info(`server is running on port ${5000}`)
}
bootstrap()