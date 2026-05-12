import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, tasks, InsertTask, Task, courses, InsertCourse, Course, works, InsertWork, Work, userConnections, InsertUserConnection, UserConnection, userProfiles, InsertUserProfile, UserProfile } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============= TASKS =============

export async function getUserTasks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tasks).where(eq(tasks.userId, userId));
}

export async function createTask(data: InsertTask) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(tasks).values(data);
  return true;
}

export async function updateTask(id: number, data: Partial<InsertTask>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(tasks).set(data).where(eq(tasks.id, id));
}

export async function deleteTask(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(tasks).where(eq(tasks.id, id));
}

// ============= COURSES =============

export async function getUserCourses(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courses).where(eq(courses.userId, userId));
}

export async function createCourse(data: InsertCourse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(courses).values(data);
  return true;
}

export async function updateCourse(id: number, data: Partial<InsertCourse>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(courses).set(data).where(eq(courses.id, id));
}

export async function deleteCourse(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(courses).where(eq(courses.id, id));
}

// ============= WORKS =============

export async function getUserWorks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(works).where(eq(works.userId, userId));
}

export async function createWork(data: InsertWork) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(works).values(data);
  return true;
}

export async function updateWork(id: number, data: Partial<InsertWork>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(works).set(data).where(eq(works.id, id));
}

export async function deleteWork(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(works).where(eq(works.id, id));
}

// ============= USER CONNECTIONS =============

export async function getUserConnections(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userConnections).where(eq(userConnections.userId, userId));
}

export async function createUserConnection(data: InsertUserConnection) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(userConnections).values(data);
  return true;
}

export async function updateUserConnection(id: number, data: Partial<InsertUserConnection>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(userConnections).set(data).where(eq(userConnections.id, id));
}

export async function deleteUserConnection(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(userConnections).where(eq(userConnections.id, id));
}

export async function searchUsers(query: string) {
  const db = await getDb();
  if (!db) return [];
  // Simple search by name or email
  return db.select().from(users).limit(10);
}

// ============= USER PROFILES =============

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createUserProfile(data: InsertUserProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(userProfiles).values(data);
  return true;
}

export async function updateUserProfile(userId: number, data: Partial<InsertUserProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(userProfiles).set(data).where(eq(userProfiles.userId, userId));
}

// TODO: add more feature queries here as your schema grows.
