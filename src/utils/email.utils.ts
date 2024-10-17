function isValid(email: string): boolean {
    const REGEX = /^(?=.{1,64}@.{1,255}$)(?=.{1,64})[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return REGEX.test(email);
}

const EmailUtils = {
    isValid,
} as const;

export default EmailUtils;
