declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ORG_OWNER_EMAIL?: string;
    AUTH_SETUP_TOKEN?: string;
    BUCKET?: R2Bucket;
  }
}
