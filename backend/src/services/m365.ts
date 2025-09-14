import { getGraphClient } from '../utils/graphClient';
import { ResponseType } from '@microsoft/microsoft-graph-client';

interface OverviewEntry {
  userPrincipalName: string;
  accountEnabled: boolean | null;
  lastActivityDate: string | null;
  licenses: string[];
  policies: string[];
}

interface DetailEntry extends OverviewEntry {
  usage: Record<string, string | null>;
}

/**
 * Fetches Microsoft 365 usage data for the last 180 days.
 * Returns structured overview and detail arrays.
 */
export async function fetchM365Usage(): Promise<{ overview: OverviewEntry[]; detail: DetailEntry[] }> {
  const client = getGraphClient();

  // Fetch basic user info and license assignments
  const userPage = await client
    .api('/users')
    .select('id,userPrincipalName,accountEnabled,assignedLicenses')
    .top(999)
    .get();

  const users = userPage.value as any[];

  // Fetch usage detail report (CSV) for last 180 days
  const csvText: string = await client
    .api("/reports/getOffice365ActiveUserDetail(period='D180')")
    .responseType(ResponseType.TEXT)
    .get();

  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const headers = lines.shift()?.split(',') || [];
  const usageRows = lines.map((line) => {
    const cols = line.split(',');
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = cols[idx];
    });
    return obj;
  });

  const usageMap = new Map<string, Record<string, string>>();
  usageRows.forEach((row) => {
    const upn = row['User Principal Name']?.toLowerCase();
    if (upn) usageMap.set(upn, row);
  });

  const overview: OverviewEntry[] = [];
  const detail: DetailEntry[] = [];

  for (const user of users) {
    const upn: string = user.userPrincipalName;
    const usage = usageMap.get(upn.toLowerCase()) || {};
    const lastActivityDate = usage['Last Activity Date'] || null;
    const licenses: string[] = (user.assignedLicenses || []).map((l: any) => l.skuId);

    // Placeholder for policy assignments and Windows licenses
    const policies: string[] = [];

    overview.push({
      userPrincipalName: upn,
      accountEnabled: user.accountEnabled ?? null,
      lastActivityDate,
      licenses,
      policies,
    });

    detail.push({
      userPrincipalName: upn,
      accountEnabled: user.accountEnabled ?? null,
      lastActivityDate,
      licenses,
      policies,
      usage,
    });
  }

  return { overview, detail };
}
