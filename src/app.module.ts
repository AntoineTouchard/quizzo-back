import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Save } from './save.entity'
import { SaveModule } from './save/save.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DATABASE_HOST') ?? 'db4free.net',
        port: configService.get('DATABASE_PORT') ?? 3306,
        username: configService.get('DATABASE_USER') ?? 'bingoany',
        password: configService.get('DATABASE_PASS') ?? 'bingoany',
        database: configService.get('DATABASE_NAME') ?? 'bingoany',
        synchronize: configService.get('DATABASE_SYNC') ?? false,
        charset: 'utf8mb4',
        logging: ['error'],
        entities: [Save],
      }),
    }),
    SaveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
