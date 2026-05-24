import { createHmac } from 'node:crypto';
import {
    decryptGoogleToken,
    encryptGoogleToken,
    hashToken,
    verifyLocalAuthToken,
} from './session';

const originalEnv = process.env;

function signPayload(payload: string, password: string) {
    return createHmac('sha256', password).update(payload).digest('base64url');
}

function createLocalToken(payload: { sub: string; exp: number }) {
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
        'base64url',
    );
    return `${encodedPayload}.${signPayload(encodedPayload, 'local-password')}`;
}

describe('session helpers', () => {
    beforeEach(() => {
        process.env = {
            ...originalEnv,
            APP_SESSION_SECRET: 'a'.repeat(32),
            GOOGLE_TOKEN_ENCRYPTION_KEY: 'b'.repeat(32),
            AUTH_USERNAME: 'mentor',
            AUTH_PASSWORD: 'local-password',
        };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('verifies a signed, unexpired local auth token', () => {
        const token = createLocalToken({
            sub: 'mentor',
            exp: Date.now() + 60_000,
        });

        expect(verifyLocalAuthToken(token)).toBe(true);
    });

    it('rejects expired or tampered local auth tokens', () => {
        const expiredToken = createLocalToken({
            sub: 'mentor',
            exp: Date.now() - 1,
        });
        const validToken = createLocalToken({
            sub: 'mentor',
            exp: Date.now() + 60_000,
        });

        expect(verifyLocalAuthToken(expiredToken)).toBe(false);
        expect(verifyLocalAuthToken(`${validToken}.tampered`)).toBe(false);
    });

    it('hashes app session tokens without storing the raw value', () => {
        const tokenHash = hashToken('session-token');

        expect(tokenHash).toBe(hashToken('session-token'));
        expect(tokenHash).not.toBe('session-token');
        expect(tokenHash).not.toBe(hashToken('other-session-token'));
    });

    it('encrypts and decrypts Google refresh tokens', () => {
        const encrypted = encryptGoogleToken('google-refresh-token');

        expect(encrypted).toMatch(/^v1:/);
        expect(encrypted).not.toContain('google-refresh-token');
        expect(decryptGoogleToken(encrypted)).toBe('google-refresh-token');
    });
});
