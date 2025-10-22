// export const runtime = "nodejs";

// import { handlers } from "@/auth" 
// export const { GET, POST } = handlers
// path to your auth file
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);