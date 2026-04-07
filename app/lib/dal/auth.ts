import "server-only";

export type Session = {
  role: "admin" | "user";
};

/**
 * Data Access Layer: session tekshiruvi faqat serverda.
 * Haqiqiy auth (cookie, JWT, DB) shu yerda ulansin.
 */
export async function verifySession(): Promise<Session> {
  // TODO: cookies() / getServerSession / DB
  return { role: "user" };
}
