import { CreationAttributes, FindOptions, UpdateOptions } from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";

export abstract class AbstractRepository<T extends Model<T>> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findByField(field: keyof T, value: any): Promise<T | null> {
    const options: FindOptions = {
      where: { [field]: value },
    };
    return this.model.findOne(options);
  }

  async create(item: CreationAttributes<T>): Promise<T> {
    return this.model.create(item);
  }

  async update(id: number, item: Partial<T>): Promise<[number]> {
    const options: UpdateOptions = {
      where: { id },
    };
    return this.model.update(item, options);
  }

  async delete(id: number): Promise<number> {
    const options: UpdateOptions = {
      where: { id },
    };
    return this.model.destroy(options);
  }
}
