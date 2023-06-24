import { url } from "inspector";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input: { url }, ctx }) => {
      console.log(ctx.auth.userId);
      const image = await ctx.prisma.image.create({
        data: { url, userId: ctx.auth.userId },
      });
      return image;
    }),
  getUrl: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.auth.userId;
    if (currentUserId == null) return;
    const imageUrl = await ctx.prisma.image.findMany({
      where: { userId: currentUserId },
      select: {
        url: true,
      },
    });
    return imageUrl;
  }),
});
