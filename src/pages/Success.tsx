import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // You could verify the session here if needed
    console.log('Payment successful! Session ID:', sessionId);
  }, [sessionId]);

  return (
    <div className="container mx-auto py-12 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your order has been received and will be processed shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your email address.
          </p>
          {sessionId && (
            <p className="text-xs font-mono bg-muted p-2 rounded">
              Order ID: {sessionId}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
