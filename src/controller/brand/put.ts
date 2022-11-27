import { ERROR } from '@const';
import { Brand } from '@model';
import { BrandRepository } from '@repository';
import { NextFunction, Request, Response } from 'express';

export async function addBrand(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brand = new Brand(req.body.title);
    const brandRepo = new BrandRepository();
    const data = await brandRepo.newBrand(brand);
    res.json(data);
  } catch (error) {
    next(ERROR.HTTP_500);
  }
}
