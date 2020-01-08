import React, { useState, useEffect } from 'react';

import { createRootNavigator } from './routes';
import { isSignedIn } from './services/auth';

const App: React.FC = () => {
  const [signed, setSigned] = useState<boolean>(false);
  const [signLoaded, setSignLoaded] = useState<boolean>(false);

  const checkSignedIn = async () => {
    const signedIn = await isSignedIn();
    setSigned(signedIn);
    setSignLoaded(true);
  };

  useEffect(() => {
    checkSignedIn();
  }, []);

  if (!signLoaded) {
    return null;
  }

  const Layout = createRootNavigator(signed);
  return <Layout />;
};

export default App;
