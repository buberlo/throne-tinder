import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as themeModule from '../theme';

const theme = themeModule.default || themeModule;
const colors = theme.colors || {};
const spacing = theme.spacing || {};
const typography = theme.typography || {};

const MOOD_STYLES = {
  sparkling: {
    emoji: '✨',
    label: 'Sparkling',
    color: colors.sparkling || '#7C3AED',
  },
  cozy: {
    emoji: '🧸',
    label: 'Cozy',
    color: colors.cozy || '#F59E0B',
  },
  party: {
    emoji: '🪩',
    label: 'Party',
    color: colors.party || '#EC4899',
  },
  business: {
    emoji: '💼',
    label: 'Business',
    color: colors.business || '#0EA5E9',
  },
  mysterious: {
    emoji: '🌫️',
    label: 'Mysterious',
    color: colors.mysterious || '#6366F1',
  },
  chaotic: {
    emoji: '🌪️',
    label: 'Chaotic',
    color: colors.chaotic || '#EF4444',
  },
  romantic: {
    emoji: '💘',
    label: 'Romantic',
    color: colors.romantic || '#F43F5E',
  },
  sweaty: {
    emoji: '💦',
    label: 'Sweaty',
    color: colors.sweaty || '#14B8A6',
  },
};

const DEFAULT_MOOD = {
  emoji: '🚽',
  label: 'Unspecified',
  color: colors.text || '#333333',
};

const getMood = (mood) => {
  if (!mood) {
    return DEFAULT_MOOD;
  }

  const key = String(mood).toLowerCase().trim();
  const knownMood = MOOD_STYLES[key];

  if (knownMood) {
    return knownMood;
  }

  return {
    ...DEFAULT_MOOD,
    label: String(mood),
  };
};

const withAlpha = (color, alpha = '1A') => {
  if (typeof color === 'string' && color.startsWith('#') && color.length === 7) {
    return `${color}${alpha}`;
  }

  return color;
};

const MoodBadge = ({ mood, size = 'medium', showLabel = true, style }) => {
  const moodInfo = getMood(mood);
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        {
          borderColor: moodInfo.color,
          backgroundColor: withAlpha(moodInfo.color),
        },
        isSmall ? styles.badgeSmall : styles.badgeMedium,
        style,
      ]}
      accessibilityRole="text"
    >
      <Text style={styles.emoji}>{moodInfo.emoji}</Text>
      {showLabel ? (
        <Text
          style={[
            styles.label,
            { color: moodInfo.color },
            isSmall ? styles.labelSmall : styles.labelMedium,
          ]}
        >
          {moodInfo.label}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  badgeSmall: {
    paddingHorizontal: spacing.xs || 8,
    paddingVertical: spacing.xs || 4,
  },
  badgeMedium: {
    paddingHorizontal: spacing.sm || 12,
    paddingVertical: spacing.sm || 8,
  },
  emoji: {
    fontSize: typography.xs || 14,
  },
  label: {
    marginLeft: spacing.xs || 6,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: typography.xs || 12,
  },
  labelMedium: {
    fontSize: typography.sm || 14,
  },
});

export default MoodBadge;