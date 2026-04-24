/**
 * xangi専用コマンド — プラットフォーム別に組み立て
 *
 * コマンド内容は prompts/*.md ファイルから読み込む。
 * fork独自のプラットフォーム別分割（COMMON / DISCORD / SLACK）を維持。
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type ChatPlatform = 'discord' | 'slack';

/**
 * Load a prompt file from the prompts/ directory (project root)
 */
function loadPromptFile(filename: string): string {
  const projectRoot = join(__dirname, '..', '..');
  const filePath = join(projectRoot, 'prompts', filename);

  if (!existsSync(filePath)) {
    console.warn(`[prompts] ${filename} not found at`, filePath);
    return '';
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    console.log(`[prompts] Loaded ${filename} (${content.length} bytes)`);
    return content;
  } catch (err) {
    console.error(`[prompts] Failed to load ${filename}:`, err);
    return '';
  }
}

/**
 * プラットフォームに応じたXANGI_COMMANDSを構築
 * - discord: 共通 + Discord専用
 * - slack: 共通 + Slack専用
 * - undefined: 共通 + 全プラットフォーム
 */
export function buildXangiCommands(platform?: ChatPlatform): string {
  const parts: string[] = [];

  // Always load common commands
  const common = loadPromptFile('XANGI_COMMANDS_COMMON.md');
  if (common) parts.push(common);

  // Load platform-specific commands
  if (platform === 'discord') {
    const discord = loadPromptFile('XANGI_COMMANDS_DISCORD.md');
    if (discord) parts.push(discord);
  } else if (platform === 'slack') {
    const slack = loadPromptFile('XANGI_COMMANDS_SLACK.md');
    if (slack) parts.push(slack);
  } else {
    // Both platforms or unknown — load all
    const discord = loadPromptFile('XANGI_COMMANDS_DISCORD.md');
    if (discord) parts.push(discord);
    const slack = loadPromptFile('XANGI_COMMANDS_SLACK.md');
    if (slack) parts.push(slack);
  }

  return parts.join('\n\n');
}

// 後方互換
export const XANGI_COMMANDS = buildXangiCommands();
