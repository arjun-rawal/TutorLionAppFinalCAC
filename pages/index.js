import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

function signOutButton() {
    console.log("signed in");
    const { signOut } = useAuthenticator();

    return <Button title="Sign Out" onPress={signOut}>Sign Out</Button>;

  }


export default function App1(){
    const [authOpen,setAuthOpen] = useState(false)

    const { authStatus } = useAuthenticator((context) => [context.authStatus]);
    const { user } = useAuthenticator((context) => [context.user]);
    var isLoggedIn = (authStatus==="authenticated");


    function loginPage(){

    }
    return (
        <>
        {authStatus !== 'authenticated' ? (
            
            // {authOpen == false ? (

            <>
                <Button onPress={()=>{setAuthOpen(!authOpen)}} title="Sign In"></Button>
            {authOpen == true &&
                <Authenticator/>
            }
            <Text>{authOpen}</Text>
            </>
            // ):(
            //     <Authenticator/>
            // )}

            
        ) : (
            <View>
      <Text>SIGNED IN</Text>
      <signOutButton/>
      </View>
      )}
            
           </>
    );
}