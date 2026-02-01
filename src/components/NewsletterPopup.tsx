import { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NewsletterPopup = () => {
  const {
    hasSeenNewsletterPopup,
    setHasSeenNewsletterPopup,
    isNewsletterSubscribed,
    subscribeNewsletter,
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds if user hasn't seen it and isn't subscribed
    if (!hasSeenNewsletterPopup && !isNewsletterSubscribed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenNewsletterPopup, isNewsletterSubscribed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeenNewsletterPopup(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    subscribeNewsletter(email);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Close after showing success
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (isNewsletterSubscribed) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left side - Image/Gradient */}
          <div className="hidden sm:flex bg-gradient-to-br from-secondary to-muted items-center justify-center p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={40} className="text-foreground" />
              </div>
              <p className="text-3xl font-light">10%</p>
              <p className="text-sm text-muted-foreground">korting</p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-6 sm:p-8">
            {!isSuccess ? (
              <>
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-light">
                    Ontvang 10% korting
                  </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground mb-6">
                  Schrijf je in voor onze nieuwsbrief en ontvang 10% korting op je eerste bestelling.
                  Plus: als eerste op de hoogte van nieuwe collecties en exclusieve aanbiedingen.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="jouw@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isSubmitting ? 'Even geduld...' : 'AANMELDEN'}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  Door je aan te melden ga je akkoord met onze{' '}
                  <a href="/privacy" className="underline">privacyverklaring</a>.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift size={32} className="text-green-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Welkom!</h3>
                <p className="text-sm text-muted-foreground">
                  Check je inbox voor je kortingscode.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
