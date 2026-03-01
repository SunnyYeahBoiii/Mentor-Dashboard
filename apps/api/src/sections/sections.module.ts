import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [SectionsController],
    providers: [SectionsService],
    exports: [SectionsService],
})
export class SectionsModule { }
