import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Save } from 'src/save.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Save])],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
