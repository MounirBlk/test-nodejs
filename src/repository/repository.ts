import { IModel } from '@model';
import { Requester } from '@middleware';

export abstract class Repository<T extends IModel> {
  #requester;

  constructor() {
    const path = this.constructor.name.replace('Repository', '').toLowerCase();
    this.#requester = new Requester(`${process.env.API_URL}/${path}`);
  }

  public async create(model: T): Promise<T> {
    try {
      const data = await this.#requester.post(model.serialize());
      return Promise.resolve(<T>data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findAll(): Promise<T[]> {
    try {
      const data = await this.#requester.get();
      return Promise.resolve(<T[]>data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async find(id: string): Promise<T> {
    try {
      const data = await this.#requester.get(id);
      return Promise.resolve(<T>data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
