import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============= TASKS =============
  tasks: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getUserTasks(ctx.user.id)
    ),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        status: z.enum(["pending", "in_progress", "completed"]).default("pending"),
        priority: z.enum(["low", "medium", "high"]).default("medium"),
        dueDate: z.date().optional(),
      }))
      .mutation(({ ctx, input }) =>
        db.createTask({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          status: input.status,
          priority: input.priority,
          dueDate: input.dueDate,
        })
      ),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["pending", "in_progress", "completed"]).optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
        dueDate: z.date().optional(),
      }))
      .mutation(({ input }) =>
        db.updateTask(input.id, input)
      ),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) =>
        db.deleteTask(input.id)
      ),
  }),

  // ============= COURSES =============
  courses: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getUserCourses(ctx.user.id)
    ),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        totalHours: z.number().default(0),
      }))
      .mutation(({ ctx, input }) =>
        db.createCourse({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          totalHours: input.totalHours,
        })
      ),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        progress: z.number().optional(),
        completedHours: z.number().optional(),
      }))
      .mutation(({ input }) =>
        db.updateCourse(input.id, input)
      ),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) =>
        db.deleteCourse(input.id)
      ),
  }),

  // ============= WORKS =============
  works: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getUserWorks(ctx.user.id)
    ),
    create: protectedProcedure
      .input(z.object({
        courseId: z.number().optional(),
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        dueDate: z.date(),
      }))
      .mutation(({ ctx, input }) =>
        db.createWork({
          userId: ctx.user.id,
          courseId: input.courseId,
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
        })
      ),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
      }))
      .mutation(({ input }) =>
        db.updateWork(input.id, input)
      ),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) =>
        db.deleteWork(input.id)
      ),
  }),

  // ============= USER CONNECTIONS =============
  connections: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getUserConnections(ctx.user.id)
    ),
    create: protectedProcedure
      .input(z.object({
        connectedUserId: z.number(),
      }))
      .mutation(({ ctx, input }) =>
        db.createUserConnection({
          userId: ctx.user.id,
          connectedUserId: input.connectedUserId,
          status: "pending",
        })
      ),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "accepted", "blocked"]),
      }))
      .mutation(({ input }) =>
        db.updateUserConnection(input.id, { status: input.status })
      ),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) =>
        db.deleteUserConnection(input.id)
      ),
  }),

  // ============= USER PROFILES =============
  profile: router({
    get: protectedProcedure.query(({ ctx }) =>
      db.getUserProfile(ctx.user.id)
    ),
    update: protectedProcedure
      .input(z.object({
        bio: z.string().optional(),
        dailyGoal: z.number().optional(),
        isPublic: z.boolean().optional(),
        theme: z.enum(["light", "dark", "auto"]).optional(),
        notificationsEnabled: z.boolean().optional(),
      }))
      .mutation(({ ctx, input }) =>
        db.updateUserProfile(ctx.user.id, input)
      ),
  }),

  messages: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getUserMessages(ctx.user.id)
    ),
    conversation: protectedProcedure
      .input(z.object({ otherUserId: z.number() }))
      .query(({ ctx, input }) =>
        db.getConversation(ctx.user.id, input.otherUserId)
      ),
    send: protectedProcedure
      .input(z.object({
        recipientId: z.number(),
        content: z.string().min(1).max(1000),
      }))
      .mutation(({ ctx, input }) =>
        db.createMessage({
          senderId: ctx.user.id,
          recipientId: input.recipientId,
          content: input.content,
        })
      ),
    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) =>
        db.markMessageAsRead(input.id)
      ),
  }),

  // ============= USERS =============
  users: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(({ input }) =>
        db.createUser({
          name: input.name,
          email: input.email,
          password: input.password,
        })
      ),
  }),

  // ============= SCHEDULED CONFERENCES =============
  conferences: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getScheduledConferences(ctx.user.id)
    ),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        roomName: z.string().min(1).max(255),
        scheduledTime: z.date(),
        duration: z.number().default(60),
        participants: z.array(z.number()).optional(),
      }))
      .mutation(({ ctx, input }) => {
        const participantsJson = input.participants ? JSON.stringify(input.participants) : null;
        return db.scheduleConference({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          roomName: input.roomName,
          scheduledTime: input.scheduledTime,
          duration: input.duration,
          participants: participantsJson,
          status: "scheduled",
        });
      }),
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["scheduled", "ongoing", "completed", "cancelled"]),
      }))
      .mutation(({ input }) =>
        db.updateConferenceStatus(input.id, input.status)
      ),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) =>
        db.deleteConference(input.id)
      ),
  })
});

export type AppRouter = typeof appRouter;
