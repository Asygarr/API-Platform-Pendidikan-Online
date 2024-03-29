import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { PrismaService } from '../src/connection/prisma.service';

@Module({
  providers: [TestService, PrismaService],
})
export class TestModule {}
