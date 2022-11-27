import { Brand } from '@model';
import { Repository } from './repository';
import { IModel } from '@model';
import { isUndefinedOrNull } from '@middleware';

export class BrandRepository extends Repository<Brand> {
    constructor() {
        super();
    }

    public async newBrand(brand: Brand): Promise<Brand> {
        try {
            return Promise.resolve(await this.create(brand));
        } catch (error) {
            return Promise.reject(error);
        }
    }    
    
    public async findAllBrands(): Promise<Brand[]> {
        try {
            return Promise.resolve(await this.findAll());
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findBrand(id: string): Promise<Brand> {
        try {
            return Promise.resolve(await this.find(id));
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
