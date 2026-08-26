// Shared design tokens for Throne Tinder.
// Keep values platform-agnostic so Expo, iOS, and Android render consistently.

const colors = {
  background: '#F7F5F0',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardBorder: '#E8E2D8',

  text: '#2B2B2B',
  textMuted: '#7A736A',
  textSubtle: '#A39B90',

  primary: '#5B7CFA',
  primaryDark: '#3F5FDE',
  secondary: '#FF7A59',
  accent: '#FFC857',

  success: '#34C759',
  warning: '#FFB020',
  danger: '#FF5A5F',
  info: '#4FC3F7',

  border: '#E6E0D6',
  shadow: 'rgba(43, 43, 43, 0.12)',
  overlay: 'rgba(43, 43, 43, 0.55)',

  score: {
    excellent: '#34C759',
    good: '#8BC34A',
    fair: '#FFB020',
    poor: '#FF5A5F',
  },

  mood: {
    calm: '#4FC3F7',
    party: '#FF7A59',
    business: '#5B7CFA',
    cozy: '#FFC857',
    mysterious: '#9C27B0',
  },

  badge: {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    none: '#9E9E9E',
  },

  map: {
    pin: '#5B7CFA',
    pinReserved: '#34C759',
    pinSkipped: '#FF5A5F',
    user: '#FF7A59',
    line: '#5B7CFA',
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  page: 16,
  card: 20,
  cardGap: 12,
  section: 28,
};

const radii = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 30,
  pill: 999,
};

const typography = {
  fontFamily: 'System',

  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    title: 34,
  },

  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeights: {
    tight: 1.1,
    normal: 1.35,
    relaxed: 1.55,
  },
};

const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },

  floating: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 12,
  },

  toast: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
  },
};

const sizes = {
  cardWidth: 320,
  cardHeight: 420,
  badgeSize: 140,
  avatarSize: 96,
  iconSize: 24,
  mapPinSize: 34,
};

const timing = {
  fast: 120,
  normal: 220,
  slow: 350,
};

const layout = {
  safePadding: 16,
  headerHeight: 56,
  bottomNavHeight: 64,
  toastHeight: 72,
};

const theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
  sizes,
  timing,
  layout,
};

export default theme;