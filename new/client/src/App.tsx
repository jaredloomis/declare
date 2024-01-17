import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, useParams } from 'react-router-dom';

import { Navigation } from './features/navigation/Navigation';
import { NotFound } from './components/NotFound';
import { Sidebar } from './features/navigation/Sidebar';
import { useAuthStore } from './authStore';
import { getUser } from './features/auth/api';
import { parseJwt } from './features/auth/jwt_util';
import { Spinner } from './components/Spinner';

const LazyLogIn = React.lazy(() => import('./features/auth/LogIn'));
const LazySignUp = React.lazy(() => import('./features/auth/SignUp'));
const LazyTestList = React.lazy(() => import('./features/test-creation/TestList'));

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
                  <Route path='/login' Component={LazyLogIn} />
                  <Route path='/signup' Component={LazySignUp} />
                  <Route path='/tests' Component={LazyTestList} />
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

const _LazyTestView = import('./features/test-creation/TestView');
const LazyTestView = React.lazy(() => _LazyTestView);
function TestViewContainer() {
  const { id } = useParams();
  return <LazyTestView testId={parseInt(id!)} />;
}

const _LazyTestEdit = import('./features/test-creation/TestEdit');
const LazyTestEdit = React.lazy(() => _LazyTestEdit);
function TestEditContainer() {
  const { id } = useParams();
  return <LazyTestEdit testId={parseInt(id!)} />;
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
