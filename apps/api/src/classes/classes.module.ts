import { Module } from '@nestjs/common';
import { ClassService } from './classes.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClassController } from './classes.controller';

@Module({
    imports: [PrismaModule],
    controllers: [ClassController],
    providers: [ClassService],
})
export class ClassModule {}
