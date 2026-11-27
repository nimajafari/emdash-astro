import type { PortableTextBlock } from "emdash";
import { extractText } from "./reading-time";

const MAX_LENGTH = 155;
const WHITESPACE_REGEX = /\s+/g;

/**
 * Build a meta description from the opening paragraphs of Portable Text.
 * Headings and other block styles are skipped. Returns undefined when there
 * is no body text, so callers can fall through to their next default.
 */
export function describeContent(
	blocks: PortableTextBlock[] | undefined,
): string | undefined {
	if (!Array.isArray(blocks)) return undefined;

	const paragraphs = blocks.filter(
		(block) =>
			block._type === "block" &&
			(!("style" in block) || !block.style || block.style === "normal"),
	);
	const text = extractText(paragraphs).replace(WHITESPACE_REGEX, " ").trim();
	if (!text) return undefined;
	if (text.length <= MAX_LENGTH) return text;

	const cut = text.slice(0, MAX_LENGTH - 1);
	const lastSpace = cut.lastIndexOf(" ");
	const trimmed = (lastSpace > MAX_LENGTH / 2 ? cut.slice(0, lastSpace) : cut)
		.replace(/[\s,;:.–—-]+$/u, "");
	return `${trimmed}…`;
}
