import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterSnakesDto } from './dto/filter-snakes.dto';
import { CreateSnakeDto } from './dto/create-snake.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SnakesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FilterSnakesDto) {
    const { isVenomous, dangerLevel, search, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.SnakeWhereInput = {};

    if (isVenomous !== undefined) {
      where.isVenomous = isVenomous;
    }

    if (dangerLevel) {
      where.dangerLevel = dangerLevel;
    }

    if (search) {
      where.OR = [
        { scientificName: { contains: search, mode: 'insensitive' } },
        { family: { contains: search, mode: 'insensitive' } },
        { id: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.snake.count({ where }),
      this.prisma.snake.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ dangerLevel: 'asc' }, { scientificName: 'asc' }],
      }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findVenomous() {
    return this.prisma.snake.findMany({
      where: { isVenomous: true },
      orderBy: { dangerLevel: 'asc' },
    });
  }

  async findHarmless() {
    return this.prisma.snake.findMany({
      where: { isVenomous: false },
      orderBy: { scientificName: 'asc' },
    });
  }

  async findOne(id: string) {
    const snake = await this.prisma.snake.findUnique({
      where: { id },
    });

    if (!snake) {
      throw new NotFoundException(`Snake with ID '${id}' not found`);
    }

    return snake;
  }

  async create(dto: CreateSnakeDto) {
    return this.prisma.snake.create({
      data: dto as any,
    });
  }

  async update(id: string, data: Partial<CreateSnakeDto>) {
    await this.findOne(id);
    return this.prisma.snake.update({
      where: { id },
      data: data as any,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.snake.delete({
      where: { id },
    });
  }
}
