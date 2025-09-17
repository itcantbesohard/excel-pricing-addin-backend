import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const tenant = process.env.TENANT_ID;
const issuer = `https://login.microsoftonline.com/${tenant}/v2.0`;
const jwksUri = `https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`;
const expectedAudience = process.env.CLIENT_ID;

const client = jwksClient({
  jwksUri,
  cache: true,
  cacheMaxAge: 10 * 60 * 1000, // 10 minutes
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      callback(null, key.getPublicKey());
    }
  });
}

export default  function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ error: 'No token' })
    
 jwt.verify(token, getKey, {
    algorithms: ['RS256'],
    issuer,
    audience: expectedAudience
  }, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded; 
    next();
  });
}
