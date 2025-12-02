// Simple API utility for Cloud Spend Viewer
// Builds query string from filters and fetches from /api/spend

export async function fetchSpendData(filters = {}) {
  // Build query params only for truthy values
  const params = new URLSearchParams();
  if (filters.provider) params.set('cloud', filters.provider);
  if (filters.team) params.set('team', filters.team);
  if (filters.env) params.set('env', filters.env);
  if (filters.month) params.set('month', filters.month); 

  const url = `https://cloud-spend-viewer.onrender.com/api/spend${params.toString() ? `?${params.toString()}` : ''}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Request failed ${res.status}: ${text || res.statusText}`);
    }
    const json = await res.json();
    // Expecting shape: { count, items }
    return { data: json, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
