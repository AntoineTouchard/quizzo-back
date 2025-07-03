import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'User-Agent',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  await app.listen(process.env.PORT ?? 3200)
}
bootstrap()
