import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: { userId, ...dto },
    });

    return bookmark;
  }

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
    });
  }

  getBookmark(userId: number, id: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        userId,
        id,
      },
    });
  }

  async updateBookmark(userId: number, id: number, dto: UpdateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.update({
      where: {
        userId,
        id,
      },
      data: {
        ...dto,
      },
    });

    if (!bookmark) throw new ForbiddenException('Access to resource denied');

    return bookmark;
  }

  async deleteBookmark(userId: number, id: number) {
    const bookmark = await this.prisma.bookmark.delete({
      where: {
        userId,
        id,
      },
    });
    if (!bookmark) throw new ForbiddenException('Access to resource denied');

    return bookmark;
  }
}
