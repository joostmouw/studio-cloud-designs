import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
  firstName: z.string().min(2, 'Voornaam is verplicht'),
  lastName: z.string().min(2, 'Achternaam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(8, 'Wachtwoord moet minimaal 8 tekens zijn'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'Je moet akkoord gaan met de voorwaarden'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register: registerUser } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: string })?.from || '/account';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { label: 'Minimaal 8 tekens', met: password.length >= 8 },
    { label: 'Bevat een letter', met: /[a-zA-Z]/.test(password) },
    { label: 'Bevat een cijfer', met: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await registerUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Registratie mislukt. Probeer het opnieuw.');
      }
    } catch {
      setError('Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-md mx-auto px-6 py-12 lg:py-16">
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-light tracking-wide mb-2">Account aanmaken</h1>
            <p className="text-muted-foreground">
              Word lid van Studio Cloud
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Voornaam</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Achternaam</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
                placeholder="jouw@email.nl"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Wachtwoord</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
              )}

              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-xs ${
                      req.met ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Check size={12} className={req.met ? 'opacity-100' : 'opacity-0'} />
                    <span>{req.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="acceptTerms"
                onCheckedChange={(checked) => setValue('acceptTerms', checked as boolean)}
              />
              <label htmlFor="acceptTerms" className="text-sm text-muted-foreground cursor-pointer">
                Ik ga akkoord met de{' '}
                <a href="/terms" className="text-foreground underline hover:no-underline">
                  algemene voorwaarden
                </a>{' '}
                en het{' '}
                <a href="/privacy" className="text-foreground underline hover:no-underline">
                  privacybeleid
                </a>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 mt-4"
            >
              {isLoading ? 'Even geduld...' : 'ACCOUNT AANMAKEN'}
              {!isLoading && <ArrowRight size={16} className="ml-2" />}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">Heb je al een account?</p>
            <Button
              onClick={() => navigate('/login', { state: { from } })}
              variant="outline"
              className="w-full"
            >
              INLOGGEN
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
