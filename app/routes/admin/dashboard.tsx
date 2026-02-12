/**
 * Admin Dashboard Home.
 * Provides a high-level overview of system status and quick actions.
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Layout,
  Users,
  Activity,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Hero Slides',
      value: '3 Active',
      icon: Layout,
      color: 'text-blue-500',
      href: '/admin/hero',
    },
    {
      label: 'Staff Members',
      value: '2 Total',
      icon: Users,
      color: 'text-amber-500',
      href: '/admin/settings',
    },
    {
      label: 'System Status',
      value: 'Operational',
      icon: Activity,
      color: 'text-emerald-500',
      href: '#',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back. Here is what is happening with Alliance today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Button
                asChild
                variant="link"
                className="p-0 h-auto text-xs text-muted-foreground mt-2"
              >
                <Link to={stat.href} className="flex items-center gap-1">
                  View details <ArrowUpRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security/Permissions Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle>Access Control Active</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-relaxed">
          Your account is currently operating with{' '}
          <strong>Administrative</strong> privileges. You can manage landing
          page content, infrastructure categories, and user access.
        </CardContent>
      </Card>
    </div>
  );
}
