import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert } from './ui/alert';
import { GraduationCap, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInDialog({ open, onOpenChange }: SignInDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-center">
            Sign In Demo
          </DialogTitle>
          <DialogDescription className="text-center">
            This is a demonstration interface for the Alumni Portal
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <GraduationCap className="h-4 w-4" />
            <div>
              <h4 className="font-medium">Demo Interface</h4>
              <p className="text-sm text-muted-foreground mt-1">
                This sign-in interface is for demonstration purposes only. 
                All portal features are available without authentication.
              </p>
            </div>
          </Alert>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Available Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Alumni Dashboard with statistics</li>
              <li>• Alumni Directory with search & filtering</li>
              <li>• Event Management interface</li>
              <li>• Analytics Dashboard with charts</li>
            </ul>
          </div>
          
          <Button onClick={handleClose} className="w-full">
            Continue to Portal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}