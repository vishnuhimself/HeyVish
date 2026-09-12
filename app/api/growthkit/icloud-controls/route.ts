import { createPrivateKey, sign } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// No request identifiers, family records or request logging. Only signed controls.
export async function GET() {
  try {
    const encodedKey = process.env.GROWTHKIT_CONTROLS_SIGNING_KEY;
    const sequence = Number(process.env.GROWTHKIT_CONTROLS_SEQUENCE);
    const flag = (name: string) => {
      const value = process.env[name];
      if (value !== 'true' && value !== 'false') throw new Error('Invalid policy');
      return value === 'true';
    };
    if (!encodedKey || !Number.isSafeInteger(sequence) || sequence < 1) throw new Error('Missing policy');
    const key = createPrivateKey(Buffer.from(encodedKey, 'base64'));
    if (key.asymmetricKeyType !== 'ed25519') throw new Error('Invalid key');
    const payload = Buffer.from(JSON.stringify({
      version: 1,
      sequence,
      expires: Math.floor(Date.now() / 1000) + 7 * 86400,
      activation: flag('GROWTHKIT_CONTROLS_ACTIVATION'),
      outgoing: flag('GROWTHKIT_CONTROLS_OUTGOING'),
      incoming: flag('GROWTHKIT_CONTROLS_INCOMING'),
    }));
    return Response.json({ payload: payload.toString('base64'), signature: sign(null, payload, key).toString('base64') }, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60', 'X-Content-Type-Options': 'nosniff' },
    });
  } catch {
    // Existing clients retain an unexpired verified policy, then fail closed.
    return Response.json({ error: 'Controls temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
