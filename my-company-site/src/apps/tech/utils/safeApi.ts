// src/utils/safeApi.ts
//import api from "../api/api";

export async function safeApiCall<T>(
  request: () => Promise<T>
): Promise<{ success: boolean; data?: T; error?: any }> {
  try {
    const data = await request();
    return { success: true, data };
  } catch (err: any) {
    console.warn("Backend unreachable or error:", err.message);
    return { success: false, error: err };
  }
}
