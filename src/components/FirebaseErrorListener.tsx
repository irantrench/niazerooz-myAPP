'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * A client-side component that listens for Firestore permission errors
 * emitted by the global `errorEmitter`. When an error is caught, it displays
 * it using a toast notification. In a production environment, this could be

 * configured to log errors to a monitoring service instead.
 *
 * This listener is crucial for the development workflow, as it surfaces
 * detailed, actionable security rule violation information directly in the UI.
 */
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error("Caught a Firestore Permission Error:", error.message);
      
      // In a real app, you might want to format this differently
      // or only show it in a development environment.
      toast({
        variant: 'destructive',
        title: 'Firestore Security Rule Denied',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
        duration: 20000 // Show for a longer time
      });
      
      // We can also throw the error to make it visible in Next.js dev overlay
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);

    // Clean up the listener when the component unmounts.
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null; // This component does not render anything itself.
}
