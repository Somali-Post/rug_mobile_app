// src/theme/theme.js

export const COLORS = {
  // Backgrounds
  background: '#002855', // Deep Somali Navy (Main Background)
  surface: '#003060',    // Slightly lighter Navy for Cards (to make them pop)
  input: '#001F40',      // Darker Navy for "Pressed" inputs

  // Accents
  primary: '#FF6B00',    // Vibrant Orange
  secondary: '#4DA6FF',  // Light Blue (for secondary actions/icons)

  // Text
  textPrimary: '#FFFFFF', // White text for dark mode
  textSecondary: '#8FA9C2', // Muted Blue-Grey for subtitles
  textLight: '#FFFFFF',
  textDark: '#002855',

  // Status
  success: '#2ECC71',
  error: '#E74C3C',
  warning: '#F1C40F',
};

export const CLAY_STYLES = {
  // Dark Mode Clay Effect
  // In dark mode, we need a strong black shadow and a subtle "light" reflection

  boxShadow: {
    shadowColor: "#000000", // Deep black shadow
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },

  lightShadow: {
    shadowColor: "#1A4F7C", // Lighter Blue "Glow" (instead of white)
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  borderRadius: 20,
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};
