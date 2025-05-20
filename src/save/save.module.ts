import { Module } from '@nestjs/common'
import { SaveController } from './save.controller'
import { SaveService } from './save.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Save } from 'src/save.entity'
import { SaveGateway } from './save.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Save])],
  controllers: [SaveController],
  providers: [SaveService, SaveGateway],
})
export class SaveModule {}
