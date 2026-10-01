import jwt from 'jsonwebtoken';
const secret = () => process.env.JWT_SECRET || 'dev_secret_change_me';

const sign = (u) => jwt.sign({ id: u._id, email: u.email, role: u.role }, secret(), { expiresIn: '12h' });

function optionalAuth(req, res, next) {
  const h = req.headers.authorization || '';
  if (h.startsWith('Bearer ')) { try { req.user = jwt.verify(h.slice(7), secret()); } catch (e) {} }
  next();
}
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Login required' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
  next();
};
// ingestion: API key (feed providers) OR admin JWT
function ingestAuth(req, res, next) {
  if (req.headers['x-api-key'] && req.headers['x-api-key'] === (process.env.INGEST_API_KEY || 'rail-ingest-key')) return next();
  if (req.user && req.user.role === 'admin') return next();
  res.status(401).json({ error: 'Invalid API key' });
}

export { sign, optionalAuth, requireRole, ingestAuth };
