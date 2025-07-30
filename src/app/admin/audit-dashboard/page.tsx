import { Metadata } from 'next';
import { AuditDashboard } from '@/components/admin/AuditDashboard';

export const metadata: Metadata = {
  title: 'Audit des Liens - Dashboard | Laurent Serre',
  description: 'Tableau de bord de monitoring des liens morts et métriques de santé du site',
  robots: 'noindex, nofollow',
};

export default function AuditDashboardPage() {
  return <AuditDashboard />;
}