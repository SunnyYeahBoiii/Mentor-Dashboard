import {
    createCipheriv,
    createDecipheriv,
    createHash,
    createHmac,
    randomBytes,
    timingSafeEqual,
} from 'node:crypto';

export const APP_SESSION_COOKIE = 'md_api_session';
export const LOCAL_AUTH_COOKIE = 'md_auth_token';
export const OAUTH_STATE_COOKIE = 'md_oauth_state';
export const SESSION_TTL_MS = 1000 * 60 * 60 * 24;
export const OAUTH_STATE_TTL_MS = 1000 * 60 * 10;

function getSecret(name: string) {
    const value = process.env[name];
    if (!value || value.length < 32) {
        throw new Error(`${name} must be at least 32 characters`);
    }
    return value;
}

function keyFromSecret(secret: string) {
    return createHash('sha256').update(secret).digest();
}

export function createOpaqueToken() {
    return randomBytes(32).toString('base64url');
}

export function hashToken(token: string) {
    return createHmac('sha256', getSecret('APP_SESSION_SECRET'))
        .update(token)
        .digest('hex');
}

function localAuthSecret() {
    const username = process.env.AUTH_USERNAME;
    const password = process.env.AUTH_PASSWORD;
    if (!username || !password) {
        return null;
    }
    return { username, password };
}

export function verifyLocalAuthToken(token?: string) {
    const credentials = localAuthSecret();
    if (!token || !credentials) return false;

    const tokenParts = token.split('.');
    if (tokenParts.length !== 2) return false;

    const [payload, signature] = tokenParts;
    if (!payload || !signature) return false;

    const expectedSignature = createHmac('sha256', credentials.password)
        .update(payload)
        .digest('base64url');

    if (!safeEqual(signature, expectedSignature)) return false;

    try {
        const parsed = JSON.parse(
            Buffer.from(payload, 'base64url').toString('utf8'),
        ) as { sub?: string; exp?: number };
        return (
            parsed.sub === credentials.username &&
            typeof parsed.exp === 'number' &&
            parsed.exp > Date.now()
        );
    } catch {
        return false;
    }
}

export function safeEqual(left?: string, right?: string) {
    if (!left || !right) return false;
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);
    if (leftBuffer.length !== rightBuffer.length) return false;
    return timingSafeEqual(leftBuffer, rightBuffer);
}

export function encryptGoogleToken(token: string) {
    const key = keyFromSecret(getSecret('GOOGLE_TOKEN_ENCRYPTION_KEY'));
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([
        cipher.update(token, 'utf8'),
        cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return [
        'v1',
        iv.toString('base64url'),
        tag.toString('base64url'),
        encrypted.toString('base64url'),
    ].join(':');
}

export function decryptGoogleToken(value: string) {
    if (!value.startsWith('v1:')) {
        return value;
    }

    const [, ivValue, tagValue, encryptedValue] = value.split(':');
    if (!ivValue || !tagValue || !encryptedValue) {
        throw new Error('Invalid encrypted Google token');
    }

    const key = keyFromSecret(getSecret('GOOGLE_TOKEN_ENCRYPTION_KEY'));
    const decipher = createDecipheriv(
        'aes-256-gcm',
        key,
        Buffer.from(ivValue, 'base64url'),
    );
    decipher.setAuthTag(Buffer.from(tagValue, 'base64url'));
    return Buffer.concat([
        decipher.update(Buffer.from(encryptedValue, 'base64url')),
        decipher.final(),
    ]).toString('utf8');
}

export function getCookieOptions(maxAge: number) {
    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge,
    };
}

export function getClearCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    };
}

export function isGoogleEmailAllowed(email: string) {
    const normalizedEmail = email.toLowerCase();
    const emails = (process.env.ALLOWED_GOOGLE_EMAILS ?? '')
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);
    const domains = (process.env.ALLOWED_GOOGLE_DOMAINS ?? '')
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

    return (
        emails.includes(normalizedEmail) ||
        domains.some((domain) => normalizedEmail.endsWith(`@${domain}`))
    );
}
