import Cookies from "js-cookie";

export function setCookie(key: string, value: unknown, days = 7) {
  try {
    Cookies.set(key, JSON.stringify(value), {
      expires: days,
      path: "/",
    });
  } catch (error) {
    console.warn("Set cookie error:", error);
  }
}

export function getCookie<T>(key: string): T | null {
  try {
    const cookie = Cookies.get(key);
    return cookie ? (JSON.parse(cookie) as T) : null;
  } catch (error) {
    console.warn("Get cookie error:", error);
    return null;
  }
}

export function deleteCookie(key: string) {
  try {
    Cookies.remove(key, { path: "/" });
  } catch (error) {
    console.warn("Delete cookie error:", error);
  }
}
