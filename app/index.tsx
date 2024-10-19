// app/index.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Layout from './_layout';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) return null; // You might want to show a loading indicator here

  return (
    <NavigationContainer>
      <Layout user={user} />
    </NavigationContainer>
  );
}
