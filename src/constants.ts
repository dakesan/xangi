/**
 * アプリケーション全体で使用する定数
 */

// Discord
export const DISCORD_MAX_LENGTH = 2000;
export const DISCORD_SPLIT_MARGIN = 100; // 分割時のマージン
export const DISCORD_SAFE_LENGTH = DISCORD_MAX_LENGTH - DISCORD_SPLIT_MARGIN; // 1900

// ストリーミング
export const STREAM_UPDATE_INTERVAL_MS = 1000;

// Embed colors
export const EMBED_COLORS = {
  thinking: 0x3498db, // blue
  working: 0xf1c40f, // yellow
  done: 0x2ecc71, // green
  error: 0xe74c3c, // red
} as const;

// タイムアウト
export const DEFAULT_TIMEOUT_MS = 300000; // 5分
