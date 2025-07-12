import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PricesService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createPriceDto: CreatePriceDto) {
    return this.prisma.price.create({
      data: createPriceDto,
    });
  }

  async findAll(assetId?: string, from?: string, to?: string) {
    const where: any = {};
    
    if (assetId) {
      where.assetId = assetId;
    }
    
    if (from || to) {
      where.timestamp = {};
      if (from) where.timestamp.gte = new Date(from);
      if (to) where.timestamp.lte = new Date(to);
    }

    return this.prisma.price.findMany({
      where,
      include: {
        asset: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async findByAsset(assetId: string) {
    return this.prisma.price.findMany({
      where: { assetId },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async findLatest(assetId: string) {
    const price = await this.prisma.price.findFirst({
      where: { assetId },
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        asset: true,
      },
    });

    if (!price) {
      throw new NotFoundException(`No prices found for asset ${assetId}`);
    }

    return price;
  }


  async remove(id: string) {
    const price = await this.prisma.price.findUnique({ where: { id } });
    
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }

    return this.prisma.price.delete({ where: { id } });
  }
}
