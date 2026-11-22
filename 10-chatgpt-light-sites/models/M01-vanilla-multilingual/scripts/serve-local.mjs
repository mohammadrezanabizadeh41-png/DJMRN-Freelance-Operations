// Built-in Node HTTP preview for M01. Serves the site directory only, loopback only.
import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const modelRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(modelRoot, 'site');
const allowed = new Map([
  ['.html','text/html; charset=utf-8'], ['.css','text/css; charset=utf-8'],
  ['.js','text/javascript; charset=utf-8'], ['.svg','image/svg+xml'],
  ['.json','application/json; charset=utf-8']
]);
const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const resolvedRoot = await realpath(publicRoot);
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cache-Control': 'no-store',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
};
function respond(response, code, text, method='GET', type='text/plain; charset=utf-8') {
  response.writeHead(code, {...securityHeaders, 'Content-Type': type});
  response.end(method === 'HEAD' ? undefined : text);
}
function isInside(file) {
  const rel = path.relative(resolvedRoot, file);
  return rel === '' || (rel !== '..' && !rel.startsWith('..'+path.sep) && !path.isAbsolute(rel));
}
const server = http.createServer(async (req,res) => {
  const method = req.method ?? 'GET';
  if (method !== 'GET' && method !== 'HEAD') { respond(res,405,'Method not allowed',method);return; }
  try {
    const parsed = new URL(req.url ?? '/', 'http://localhost');
    const raw = parsed.pathname;
    if (/%2f|%5c|%00/i.test(raw) || raw.includes('\\')) { respond(res,400,'Invalid path',method);return; }
    const decoded = decodeURIComponent(raw);
    if (!decoded.startsWith('/') || decoded.includes('\\') || decoded.includes('\0')) { respond(res,400,'Invalid path',method);return; }
    const segments = decoded.split('/').filter(Boolean);
    if (segments.some(s => s === '.' || s === '..' || s.startsWith('.'))) { respond(res,403,'Forbidden path',method);return; }
    const normalized = path.resolve(resolvedRoot, '.'+decoded, decoded.endsWith('/') || !path.extname(decoded) ? 'index.html' : '');
    if (!isInside(normalized)) { respond(res,403,'Forbidden path',method);return; }
    const ext = path.extname(normalized).toLowerCase();
    if (!allowed.has(ext)) { respond(res,404,'Not found',method);return; }
    const real = await realpath(normalized).catch(() => null);
    if (!real || !isInside(real) || !(await stat(real)).isFile()) { respond(res,404,'Not found',method);return; }
    const bytes = await readFile(real);
    res.writeHead(200, {...securityHeaders, 'Content-Type':allowed.get(ext), 'Content-Length':bytes.length});
    res.end(method === 'HEAD' ? undefined : bytes);
  } catch (error) {
    if (error instanceof URIError) { respond(res,400,'Malformed URI',method);return; }
    respond(res,500,'Preview server error',method);
    console.error('Preview request failure:', error.code ?? error.message);
  }
});
server.listen(port, host, () => {
  console.log('M01_S08_LOCAL_PREVIEW=http://'+host+':'+port+'/en/');
  console.log('DOCUMENT_ROOT='+resolvedRoot);
});
