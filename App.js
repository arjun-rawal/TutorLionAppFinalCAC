import React from 'react';
import { Button, Text } from 'react-native';
import App1 from './pages/index.js'
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { PaperProvider } from 'react-native-paper';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);



function App() {

  return (
    <>
   <PaperProvider>
    <Authenticator.Provider>
      <App1/>
    </Authenticator.Provider>
    </PaperProvider>
    </>
  );
}

export default App;