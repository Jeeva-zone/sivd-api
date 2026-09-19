import { NextRequest, NextResponse } from "next/server";

const BASE = "https://api-rebix.vercel.app";
const routes: Record<string, { path: string; param: string }> = {
  "gpt-5": { path: "/api/gpt-5", param: "q" },
  gemini: { path: "/api/gemini", param: "q" },
  cohere: { path: "/api/cohere", param: "q" },
  gptlogic: { path: "/api/gptlogic", param: "q" },
  copilot: { path: "/api/copilot", param: "text" },
  llama: { path: "/api/llama-meta", param: "q" },
  pinterest: { path: "/api/pinterest", param: "q" },
  tiktok: { path: "/api/tiktok", param: "url" },
  facebook: { path: "/api/facebook", param: "url" },
  youtube: { path: "/api/ytplay", param: "q" },
  enhance: { path: "/api/enhance", param: "url" },
  screenshot: { path: "/api/ssweb", param: "url" }
};

function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  const obj = value as Record<string, unknown>;
  for (const key of ["response","reply","message","result","text","answer","content"]) {
    if (typeof obj[key] === "string") return obj[key] as string;
  }
  if (obj.data && typeof obj.data === "object") return extractText(obj.data);
  return "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mode = String(body.mode || "gpt-5");
    const input = String(body.input || "").trim();
    if (!input) return NextResponse.json({ ok:false, error:"Please enter a message." }, { status:400 });
    const spec = routes[mode];
    if (!spec) return NextResponse.json({ ok:false, error:"Unknown SIVD tool." }, { status:400 });
    const url = new URL(spec.path, BASE);
    url.searchParams.set(spec.param, input);
    if (mode === "gptlogic") url.searchParams.set("prompt", "You are SIV, a concise and helpful AI assistant.");
    const upstream = await fetch(url, { headers:{ accept:"application/json" }, cache:"no-store", signal:AbortSignal.timeout(30000) });
    const raw = await upstream.text();
    let data: unknown = raw;
    try { data = JSON.parse(raw); } catch {}
    if (!upstream.ok) return NextResponse.json({ ok:false, error:`Upstream API returned ${upstream.status}.`, detail:extractText(data) || raw.slice(0,300) }, { status:502 });
    return NextResponse.json({ ok:true, mode, text:extractText(data) || (typeof data === "string" ? data : JSON.stringify(data)), data });
  } catch (error) {
    return NextResponse.json({ ok:false, error:error instanceof Error ? error.message : "Request failed." }, { status:502 });
  }
}