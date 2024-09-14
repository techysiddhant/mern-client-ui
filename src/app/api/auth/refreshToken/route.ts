import { cookies } from "next/headers";
import cookie from "cookie";

export async function POST() {
  const response = await fetch("/api/auth/auth/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      Cookie: `refreshToken=${cookies().get("refreshToken")?.value}`,
    },
  });

  if (!response.ok) {
    console.log("refresh failed");
    return Response.json({ success: false });
  }

  const c = response.headers.getSetCookie();
  const accessToken = c.find((cookie) => cookie.includes("accessToken"));
  const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

  if (!accessToken || !refreshToken) {
    return {
      type: "error",
      message: "No cookies were found!",
    };
  }

  const parsedAccessToken = cookie.parse(accessToken);
  const parsedRefreshToken = cookie.parse(refreshToken);

  // console.log(parsedAccessToken, parsedRefreshToken);

  cookies().set({
    name: "accessToken",
    value: parsedAccessToken.accessToken,
    expires: new Date(parsedAccessToken.expires),
    // todo: check auth service for httpOnly parameter
    httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
    path: parsedAccessToken.Path,
    domain: parsedAccessToken.Domain,
    sameSite: parsedAccessToken.SameSite as "strict",
  });

  cookies().set({
    name: "refreshToken",
    value: parsedRefreshToken.refreshToken,
    expires: new Date(parsedRefreshToken.expires),
    // todo: check auth service for httpOnly parameter
    httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
    path: parsedRefreshToken.Path,
    domain: parsedRefreshToken.Domain,
    sameSite: parsedRefreshToken.SameSite as "strict",
  });
  return Response.json({ success: true });
}
