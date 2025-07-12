import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssetsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createAssetDto: CreateAssetDto, file?: Express.Multer.File) {
    const uploadPath = this.configService.get<string>('upload.uploadPath');
    let fileUrl;
    if (file) {
      fileUrl = `${uploadPath}/${file.filename}`;
    }
    return this.prisma.asset.create({
      data: {
        ...createAssetDto,
        fileUrl,
      },
    });
  }

  async findAll() {
    return this.prisma.asset.findMany({include: {prices: true}})
  }

  async findOne(id: number) {
    const asset = this.prisma.asset.findUnique({
      where: {id},
      include: {prices: true}
    })
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`)
    }
    return asset
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    const asset = this.prisma.asset.findUnique({
      where: {id}
    })

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`)
    }

    return this.prisma.asset.update({
      where: { id },
      data: updateAssetDto,
    });
  }

  async remove(id: number) {
    const asset = this.prisma.asset.findUnique({
      where: {id}
    })

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`)
    }

    return this.prisma.asset.delete({where: {id}})
  }
}
