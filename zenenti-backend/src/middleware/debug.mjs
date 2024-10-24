export default function debug(req, res, next) {
  console.log(`[API] ${req.method} ${req.originalUrl}`);

  next();
}
