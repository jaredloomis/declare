import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, useParams } from 'react-router-dom';

import { Navigation } from './features/navigation/Navigation';
import { NotFound } from './components/NotFound';
import { Sidebar } from './features/navigation/Sidebar';
import { TestList } from './features/test-creation/TestList';
import { LogIn } from './features/auth/LogIn';
import { useAuthStore } from './authStore';
import { getUser } from './features/auth/api';
import { parseJwt } from './features/auth/jwt_util';
import { TestView } from './features/test-creation/TestView';
import { TestEdit } from './features/test-creation/TestEdit';
import { SignUp } from './features/auth/SignUp';
import { Spinner } from './components/Spinner';

export function App() {
  return (
    <>
      <Auth />
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <div className='h-full'>
          <div className='flex h-full min-h-full'>
            <Sidebar />
            <div className='flex-1 h-screen'>
              <div className='container mx-auto p-10'>
                <Routes>
                  <Route index Component={NotFound} />
                  <Route path='/login' Component={LogIn} />
                  <Route path='/signup' Component={SignUp} />
                  <Route path='/tests' Component={TestList} />
                  <Route path='/suites' Component={NotFound} />
                  <Route path='/test/:id/edit' Component={TestEditContainer} />
                  <Route path='/test/:id' Component={TestViewContainer} />
                  <Route path='*' Component={NotFound} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

function TestViewContainer() {
  const { id } = useParams();
  return <TestView testId={parseInt(id!)} />;
}

function TestEditContainer() {
  const { id } = useParams();
  return <TestEdit testId={parseInt(id!)} />;
}

function Auth(props: any) {
  const auth = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not logged in
  useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      if (!auth.user && !auth.token) {
        navigate('/login');
      } else if (auth.token) {
        (async () => {
          try {
            const data = parseJwt(auth.token!);
            if (!data) {
              throw new Error('Invalid token');
            }

            const user = await getUser(data.id);
            auth.setUser(user);
          } catch (error) {
            navigate('/login');
          }
        })();
      }
    }
  }, [auth.user, location.pathname]);

  return props.children;
}
