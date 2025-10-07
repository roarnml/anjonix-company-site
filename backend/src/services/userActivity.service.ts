// services/userActivity.service.ts
import prisma from "../../prisma/client";
import { REPUTATION_RULES } from "../utils/reputationRules";

export const updateUserReputation = async (userId: string, points: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: { reputation: { increment: points } },
  });
};

export const sendNotification = async ({
  userId,
  type,
  message,
  relatedPostId,
  relatedThreadId,
  relatedUserId,
}: {
  userId: string;
  type: string;
  message: string;
  relatedPostId?: number;
  relatedThreadId?: number;
  relatedUserId?: string;
}) => {
  return prisma.notification.create({
    data: {
      userId,
      type,
      message,
      relatedPostId,
      relatedThreadId,
      relatedUserId,
    },
  });
};
export const logUserActivity = async (userId: string, action: string, details: string) => {
  return prisma.userActivityLog.create({
    data: {
        userId,
        action,
        details,
    },
  });
}

// Additional functions for activity tracking can be added here
