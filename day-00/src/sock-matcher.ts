export interface Sock {
    size: number;
    color: string;
    material: string;
    pattern: string;
    warmth: number;
}

const hasSameWarmth = (sock: Sock, other: Sock): boolean => sock.warmth === other.warmth;
const hasSameSize = (sock: Sock, other: Sock): boolean => sock.size === other.size;
const hasSamePattern = (sock: Sock, other: Sock): boolean => sock.pattern === other.pattern;
const hasSameColor = (a: Sock, b: Sock) => a.color === b.color;
const hasSameMaterial = (a: Sock, b: Sock) => a.material === b.material;
const seemsIdentical = (a: Sock, b: Sock) => hasSamePattern(a, b) && hasSameColor(a, b) && hasSameMaterial(a, b) && hasSameSize(a, b) && hasSameWarmth(a, b);

class SockMatcher {
    private static readonly PATTERN_WEIGHT = 25;
    private static readonly COLOR_WEIGHT = 20;
    private static readonly MATERIAL_WEIGHT = 20;
    private static readonly SIZE_WEIGHT = 20;
    private static readonly SIZE_PENALTY_PER_POINT = 4;
    private static readonly WARMTH_WEIGHT = 15;
    private static readonly WARMTH_PENALTY_PER_POINT = 3;
    private static readonly MATCH_BONUS = 5;
    private static readonly PERFECT_MATCH_SCORE = 100;

    private static readonly SCORERS: ReadonlyArray<(a: Sock, b: Sock) => number> = [
        (a: Sock, b: Sock) => hasSamePattern(a, b) ? SockMatcher.PATTERN_WEIGHT : 0,
        (a: Sock, b: Sock) => hasSameColor(a, b) ? SockMatcher.COLOR_WEIGHT : 0,
        (a: Sock, b: Sock) => hasSameMaterial(a, b) ? SockMatcher.MATERIAL_WEIGHT : 0,
        (a: Sock, b: Sock) => Math.max(0, SockMatcher.SIZE_WEIGHT - Math.abs(a.size - b.size) * SockMatcher.SIZE_PENALTY_PER_POINT),
        (a: Sock, b: Sock) => Math.max(0, SockMatcher.WARMTH_WEIGHT - Math.abs(a.warmth - b.warmth) * SockMatcher.WARMTH_PENALTY_PER_POINT),
        (a: Sock, b: Sock) => seemsIdentical(a, b) ? SockMatcher.MATCH_BONUS : 0,
    ];

    public static isPair = (a: Sock, b: Sock): boolean =>
        SockMatcher.computeCompatibilityScore(a, b) >= SockMatcher.PERFECT_MATCH_SCORE;

    private static computeCompatibilityScore = (a: Sock, b: Sock): number =>
        SockMatcher.SCORERS.reduce((score, scorer) => score + scorer(a, b), 0);
}

export default SockMatcher