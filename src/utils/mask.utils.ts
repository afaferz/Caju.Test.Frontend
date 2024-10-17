const NUMBER_EXP = /[0-9]/;
const CHAR_EXP = /[A-Za-z]/;
const SPECIAL_CHAR_EXP = /\S/;

const MASK_FLAG = {
    none: 0,
    number: 1 << 0,
    char: 1 << 1,
    special_char: 1 << 2,
} as const;

function format(input: string, mask: string) {
    input = input || "";
    mask = mask || "";

    let out = "";
    let inputIdx = 0;

    for (let i = 0; i < mask.length; ++i) {
        if (inputIdx >= input.length) break;
        const maskChar = mask.charAt(i);
        const inputChar = input.charAt(inputIdx);
        const maskFlag = _maskFlag(maskChar);
        if (maskFlag === MASK_FLAG.none) {
            out += maskChar;
            continue;
        }
        if (_validChar(inputChar, maskFlag)) {
            out += inputChar;
            inputIdx++;
        }
    }
    return out;
}

function _maskFlag(char: string) {
    const cases = {
        "9": MASK_FLAG.number,
        A: MASK_FLAG.char,
        S: MASK_FLAG.char | MASK_FLAG.number,
        "*": MASK_FLAG.special_char | MASK_FLAG.number | MASK_FLAG.char,
    } as Record<string, number>;

    return cases[char] ?? MASK_FLAG.none;
}
function _charMaskFlag(char: string) {
    if (SPECIAL_CHAR_EXP.test(char)) {
        if (CHAR_EXP.test(char)) return MASK_FLAG.char;
        else if (NUMBER_EXP.test(char)) return MASK_FLAG.number;
        return MASK_FLAG.special_char;
    }
    return MASK_FLAG.none;
}

function _validChar(char: string, maskFlag: number) {
    if (maskFlag === 0) return false;
    const charFlag = _charMaskFlag(char);
    return Boolean(charFlag & maskFlag);
}

const MaskUtils = {
    format,
} as const;

export default MaskUtils;
