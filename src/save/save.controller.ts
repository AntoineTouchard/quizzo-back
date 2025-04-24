import { Body, Controller, Get, Post } from '@nestjs/common';
import { SaveService } from './save.service';
import { Save } from 'src/save.entity';
import { SaveDto } from './dto/save.dto';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Get()
  async getJson(): Promise<SaveDto[]> {
    const saves = await this.saveService.getJsons();
    return saves.map((s) => SaveDto.FromEntity(s));
  }

  @Get('last')
  getLastJson(): Promise<Save> {
    return this.saveService.getLastJson();
  }

  @Post()
  saveJson(@Body() json: any): Promise<Save> {
    const jsonString = JSON.stringify(json);
    return this.saveService.saveJson(jsonString);
  }
}
