import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedures } from "../init";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedures.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedures.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "example@mail.com"
      }
    });

    return {
      success: true,
      message: "Job queued"
    };
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
