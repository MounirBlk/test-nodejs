import { ERROR } from '@const';
import { isUndefinedOrNull } from '@middleware';
import { BrandRepository } from '@repository';
import { NextFunction, Request, Response } from 'express';

export async function getBrandById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brandRepo = new BrandRepository();
    if(!isUndefinedOrNull(req.params.id)){
      const data = await brandRepo.findBrand(req.params.id);
      res.json(data);    
    }
    throw new Error("ID Brand unknown");
  } catch (error) {
    next(ERROR.HTTP_500);
  }
}
