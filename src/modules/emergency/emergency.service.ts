import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSosCallDto } from './dto/sos-call.dto';

@Injectable()
export class EmergencyService {
  constructor(private readonly prisma: PrismaService) {}

  getHotlines() {
    return {
      bangladesh: [
        {
          name: 'National Emergency Service (Police/Ambulance/Fire)',
          number: '999',
          tollFree: true,
        },
        {
          name: 'DGHS Shastho Batayon (24/7 Medical Hotline)',
          number: '16263',
          tollFree: true,
        },
        {
          name: 'National Poison Information Centre (DMCH)',
          number: '+880255165088',
          tollFree: false,
        },
      ],
      india: [
        { name: 'National Emergency Helpline', number: '112', tollFree: true },
        { name: 'Emergency Medical Ambulance', number: '108', tollFree: true },
        {
          name: 'AIIMS National Poisons Information Centre',
          number: '+911126593677',
          tollFree: false,
        },
      ],
      pakistan: [
        {
          name: 'Punjab Rescue Emergency Service',
          number: '1122',
          tollFree: true,
        },
        {
          name: 'Edhi Emergency Ambulance Service',
          number: '115',
          tollFree: true,
        },
      ],
    };
  }

  async logSosCall(dto: CreateSosCallDto, userId?: string) {
    if (dto.hospitalId) {
      const hospital = await this.prisma.hospital.findUnique({
        where: { id: dto.hospitalId },
      });
      if (!hospital) {
        throw new NotFoundException(
          `Hospital with ID '${dto.hospitalId}' not found`,
        );
      }
    }

    const log = await this.prisma.emergencyLog.create({
      data: {
        userId: userId || null,
        hospitalId: dto.hospitalId || null,
        callerPhone: dto.callerPhone || null,
        latitude: dto.latitude || null,
        longitude: dto.longitude || null,
        notes: dto.notes || 'Direct Emergency SOS Triggered',
      },
      include: {
        hospital: true,
      },
    });

    return {
      message:
        'SOS dispatch recorded. Connect immediately with emergency services.',
      logId: log.id,
      timestamp: log.createdAt,
      hospital: log.hospital,
      emergencyHotlines: this.getHotlines(),
    };
  }

  async getSosLogs() {
    return this.prisma.emergencyLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        hospital: true,
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }
}
