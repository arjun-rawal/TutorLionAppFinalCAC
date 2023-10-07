import React, { useState } from 'react';
import {  View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

function SignOutButton() {
    console.log("signed in");
    const { signOut } = useAuthenticator();

    return <Button title="Sign Out" onPress={signOut}></Button>;

  }


export default function App1(){
    const [authOpen,setAuthOpen] = useState(false)

    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    const { user } = useAuthenticator((context) => [context.user]);
    var isLoggedIn = (authStatus==="authenticated");


    return (
        <>
        {authStatus !== 'authenticated' ? (
   

            <>
            <Text>TutorLion</Text>
                    <Button onPress={()=>{setAuthOpen(!authOpen)}} title="Sign In"></Button>
                    <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
            {authOpen == true &&
                <Authenticator/>
            }
            </>
 
        ) : (
            <View>
      <Text>SIGNED IN</Text>
      <SignOutButton/>
      </View>
      )}
            
           </>
    );
}