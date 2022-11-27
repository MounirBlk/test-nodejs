import { ERROR } from '@const';
import { BrandRepository } from '@repository';
import { NextFunction, Request, Response } from 'express';

export async function getAllBrands(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brandRepo = new BrandRepository();
    const data = await brandRepo.findAllBrands();
    res.json(data);
  } catch (error) {
    next(ERROR.HTTP_500);
  }
}
