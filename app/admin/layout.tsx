import type { Metadata } from 'next';
import { adminDbOrNull, isAdminAuthenticated } from '@/lib/admin-auth';
import AdminChrome from '@/components/admin/AdminChrome';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

async function unreadCount(): Promise<number> {
  const sb = await adminDbOrNull();
  if (!sb) return 0;
  const { count } = await sb
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'unread');
  return count ?? 0;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // proxy.ts already blocks unauthenticated requests; this keeps the login
  // page (which renders inside this layout) free of the admin chrome.
  if (!(await isAdminAuthenticated())) {
    return <div className="admin-body">{children}</div>;
  }

  return <AdminChrome unread={await unreadCount()}>{children}</AdminChrome>;
}
