// utils/reputationRules.ts
export const REPUTATION_RULES = {
  UPVOTE_GAIN: 10,
  ACCEPTED_ANSWER: 50,
  CREATE_THREAD: 5,
  CREATE_POST: 3,
  CREATE_COMMENT: 2,
};
export function calculateReputation(action: keyof typeof REPUTATION_RULES): number {
  return REPUTATION_RULES[action] || 0;
}

export function adjustReputation(currentReputation: number, action: keyof typeof REPUTATION_RULES): number {
  const change = calculateReputation(action);
  return currentReputation + change;
}
// Additional functions for penalties can be added here

