const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const RESERVATION_POINTS = 10;
const SKIP_PENALTY = 3;
const CLEAN_STREAK_BONUS = 10;
const MAX_SCORE = 100;

const REPUTATION_BADGES = [
  {
    minScore: 0,
    id: 'paper-towel-peasant',
    title: 'Paper Towel Peasant',
    emoji: '🧻',
    description: 'You have been seen. The stall remembers.',
    color: '#9CA3AF',
  },
  {
    minScore: 10,
    id: 'flush-apprentice',
    title: 'Flush Apprentice',
    emoji: '🚽',
    description: 'You know how to choose a stall. Barely.',
    color: '#60A5FA',
  },
  {
    minScore: 25,
    id: 'seat-sensei',
    title: 'Seat Sensei',
    emoji: '🪑',
    description: 'Your hygiene instincts are becoming suspiciously sharp.',
    color: '#34D399',
  },
  {
    minScore: 50,
    id: 'throne-diplomat',
    title: 'Throne Diplomat',
    emoji: '🤝',
    description: 'You negotiate with toilets and they respect you.',
    color: '#FBBF24',
  },
  {
    minScore: 75,
    id: 'royal-flush-royalty',
    title: 'Royal Flush Royalty',
    emoji: '👑',
    description: 'The stalls line up. You do not line up.',
    color: '#F472B6',
  },
  {
    minScore: 100,
    id: 'toilet-titan',
    title: 'Toilet Titan',
    emoji: '💎',
    description: 'A legend whispered in every public restroom.',
    color: '#A78BFA',
  },
];

function toTimestamp(value) {
  if (value == null) return NaN;
  if (typeof value === 'number') return value;
  if (value instanceof Date) return value.getTime();

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? NaN : timestamp;
}

function getEventTimestamp(event) {
  if (event == null) return NaN;
  if (typeof event === 'number' || typeof event === 'string' || event instanceof Date) {
    return toTimestamp(event);
  }

  return toTimestamp(
    event.timestamp ??
      event.reservedAt ??
      event.skippedAt ??
      event.date ??
      event.createdAt
  );
}

function isWithinWeek(timestamp, now) {
  const time = toTimestamp(timestamp);
  return Number.isFinite(time) && time > now - WEEK_MS && time <= now;
}

function countWithinWeek(items, now) {
  const list = Array.isArray(items) ? items : [];
  return list.filter((item) => isWithinWeek(getEventTimestamp(item), now)).length;
}

export function calculateReputationScore(reservationCount, skipCount) {
  let score = reservationCount * RESERVATION_POINTS - skipCount * SKIP_PENALTY;

  if (reservationCount > 0 && skipCount === 0) {
    score += CLEAN_STREAK_BONUS;
  }

  return Math.max(0, Math.min(MAX_SCORE, score));
}

export function getReputationBadge(score) {
  const clampedScore = Math.max(0, Math.min(MAX_SCORE, Math.round(score || 0)));
  let badge = REPUTATION_BADGES[0];

  for (const candidate of REPUTATION_BADGES) {
    if (clampedScore >= candidate.minScore) {
      badge = candidate;
    }
  }

  return badge;
}

export function getNextReputationBadge(score) {
  const clampedScore = Math.max(0, Math.min(MAX_SCORE, Math.round(score || 0)));
  return REPUTATION_BADGES.find((badge) => badge.minScore > clampedScore) ?? null;
}

export function getReputationProgress(score, nextBadge) {
  if (!nextBadge) {
    return { percent: 100, remaining: 0 };
  }

  const currentMinScore = getReputationBadge(score).minScore;
  const span = nextBadge.minScore - currentMinScore;
  const remaining = Math.max(0, nextBadge.minScore - score);
  const percent = span === 0 ? 100 : Math.max(0, Math.min(100, ((score - currentMinScore) / span) * 100));

  return {
    percent,
    remaining: Math.max(0, Math.ceil(remaining)),
  };
}

export function getWeeklyReputation(reservations = [], skips = [], now = Date.now()) {
  const reservationCount = countWithinWeek(reservations, now);
  const skipCount = countWithinWeek(skips, now);
  const score = calculateReputationScore(reservationCount, skipCount);
  const badge = getReputationBadge(score);
  const nextBadge = getNextReputationBadge(score);
  const progress = getReputationProgress(score, nextBadge);

  return {
    reservationCount,
    skipCount,
    score,
    badge,
    nextBadge,
    progress,
    cleanStreak: reservationCount > 0 && skipCount === 0,
    generatedAt: now,
  };
}

export default getWeeklyReputation;