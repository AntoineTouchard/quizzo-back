import { Injectable, NotFoundException } from '@nestjs/common'
import { IsNull, Not, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Save } from 'src/save.entity'
import { Observable, Subject } from 'rxjs'

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(Save)
    private readonly saveRepository: Repository<Save>,
  ) {}

  private changeSubject = new Subject<Save>()
  newChange$: Observable<Save> = this.changeSubject

  async getLastJson(): Promise<Save> {
    const lastSave = await this.saveRepository.findOne({
      where: { data: Not(IsNull()) },
      order: { id: 'DESC' },
    })
    if (!lastSave) {
      throw new NotFoundException('No save found!')
    }
    return lastSave
  }
  async getJsons(): Promise<Save[]> {
    const lastSave = await this.saveRepository.find({
      order: { id: 'DESC' },
    })
    if (lastSave.length === 0) {
      throw new NotFoundException('No saves found!')
    }
    return lastSave
  }
  async saveJson(json: string): Promise<Save> {
    const save = await this.saveRepository.save({
      data: json,
    })
    const saveReturn = { ...save, data: JSON.parse(save.data) }
    this.changeSubject.next(saveReturn)
    return saveReturn
  }
}
