import * as React from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Eye,
  EyeOff,
  Loader,
  Mail,
  ShieldCheck,
  Lock,
  Cpu,
} from 'lucide-react';

// Logic Imports
import { authenticateUser } from '@/modules/auth/signin.server';
import {
  getUserPermissions,
  createUserSession,
} from '@/modules/auth/session.server';

/**
 * Server Action: Handles the authentication flow.
 * Uses the imports to validate user and establish session.
 */
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Invalid email or password', values: { email } };
  }

  const user = await authenticateUser(email, password);
  if (!user) {
    return { error: 'Invalid credentials', values: { email } };
  }

  const permissions = await getUserPermissions(user.id);

  return createUserSession(
    {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      permissions,
      roles: user.roles,
    },
    '/admin',
  );
}

export default function Signin() {
  const actionData = useActionData<{
    error?: string;
    values?: { email?: string };
  }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  // Maintain cursor position when toggling password visibility
  React.useEffect(() => {
    if (passwordRef.current) {
      const len = passwordRef.current.value.length;
      passwordRef.current.setSelectionRange(len, len);
    }
  }, [showPassword]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 transition-colors duration-300">
      <div className="w-full max-w-5xl">
        <Card className="overflow-hidden border-border bg-card shadow-2xl">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    Alliance Infrastructure
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Management Portal<span className="text-primary">.</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials to access the administrative dashboard.
                </p>
              </div>

              <Form method="post" className="space-y-5" noValidate>
                {actionData?.error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                    {actionData.error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="admin@alliance.com"
                      className="bg-muted/30 border-border pl-10 focus-visible:ring-primary/20"
                      defaultValue={actionData?.values?.email}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      ref={passwordRef}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="bg-muted/30 border-border pl-10 focus-visible:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 font-bold shadow-lg shadow-primary/10"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    'SECURE LOGIN'
                  )}
                </Button>
              </Form>
            </div>

            {/* Visual Panel */}
            <div className="relative hidden md:block bg-muted">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000"
                className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale dark:opacity-30"
                alt="Datacenter Infrastructure"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-12 left-12 space-y-4">
                <Cpu className="h-12 w-12 text-primary opacity-70" />
                <h2 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
                  Hardware <br /> Precision.
                </h2>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                  Enterprise-grade administration for specialized geo-physical
                  and IT assets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
