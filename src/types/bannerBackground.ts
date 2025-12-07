/**
 * Common interface for banner background settings
 * Used across all page content types
 */
export interface BannerBackground {
  imageUrl?: string | null;
  tintColor?: string;
  tintColor2?: string;
  gradientDirection?: 'to right' | 'to bottom' | 'to bottom right' | 'to top right';
  useGradient?: boolean;
  tintOpacity?: number;
  titleColor?: string;
  subtitleColor?: string;
}
