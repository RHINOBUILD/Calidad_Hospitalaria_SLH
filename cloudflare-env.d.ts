declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ORG_OWNER_EMAIL?: string;
    BUCKET?: R2Bucket;
  }
}
