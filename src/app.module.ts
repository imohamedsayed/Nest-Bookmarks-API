import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, BookmarkModule, UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
