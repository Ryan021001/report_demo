import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  Repository,
  UpdateResult,
} from 'typeorm';

export default class BaseRepo<T extends BaseEntity> {
  protected readonly repository: Repository<T>;

  constructor(protected repo: Repository<T>) {
    this.repository = repo;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  async update(condition: object, data: object): Promise<UpdateResult> {
    return this.repository.update(condition, data);
  }

  async delete(condition: object): Promise<DeleteResult> {
    return this.repository.delete(condition);
  }

  async findOne(condition: object): Promise<T | undefined> {
    return this.repository.findOne({ where: condition });
  }

  async getList(condition: object | object[]): Promise<T[]> {
    return this.repository.find({ where: condition });
  }
}
