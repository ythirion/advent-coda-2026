import SockMatcher, {Sock} from "../src/sock-matcher";

const RED_WOOL_STRIPES: Sock = {size: 42, color: "rouge", material: "laine", pattern: "rayures", warmth: 8};

type SockMatchTestCase = {
    description: string;
    sockA: Sock;
    sockB: Sock;
    expectedResult: boolean;
};

const sockMatchTestCases: SockMatchTestCase[] = [
    {
        description: "two strictly identical socks",
        sockA: RED_WOOL_STRIPES,
        sockB: {...RED_WOOL_STRIPES},
        expectedResult: true,
    },
    {
        description: "same everything except color",
        sockA: RED_WOOL_STRIPES,
        sockB: {...RED_WOOL_STRIPES, color: "bleu"},
        expectedResult: false,
    },
    {
        description: "same everything except a size difference of 1",
        sockA: RED_WOOL_STRIPES,
        sockB: {...RED_WOOL_STRIPES, size: 43},
        expectedResult: false,
    },
    {
        description: "same everything except a warmth difference of 2",
        sockA: RED_WOOL_STRIPES,
        sockB: {...RED_WOOL_STRIPES, warmth: 6},
        expectedResult: false,
    },
    {
        description: "completely different socks",
        sockA: RED_WOOL_STRIPES,
        sockB: {size: 36, color: "jaune", material: "coton", pattern: "pois", warmth: 1},
        expectedResult: false,
    },
];

describe("SockMatcher.isPair", () => {
    test.each(sockMatchTestCases)("$description", ({sockA, sockB, expectedResult}) => {
        expect(SockMatcher.isPair(sockA, sockB)).toBe(expectedResult);
    });
});
