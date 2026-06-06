import { useEffect, type FunctionComponent } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSignOut } from '#/core/auth/auth-context';

const Logout: FunctionComponent = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut().then(() => {
      navigate({ to: '/', replace: true });
    });
  }, [signOut, navigate]);

  return null;
};

export const Route = createFileRoute('/logout/')({
  component: Logout,
});
