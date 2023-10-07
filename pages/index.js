import React, { useRef, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import animation from '../assets/ani4.json';

function SignOutButton() {
  console.log('signed in');
  const { signOut } = useAuthenticator();

  return <Button title="Sign Out" onPress={signOut}></Button>;
}

export default function App1() {
  const [authOpen, setAuthOpen] = useState(false);

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const { user } = useAuthenticator((context) => [context.user]);
  var isLoggedIn = authStatus === 'authenticated';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => slideIn());
  };

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {authStatus !== 'authenticated' ? (
        <>
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                zIndex: 30,
              },
            ]}>
            <Text
              variant="displayLarge"
              style={{ position: 'absolute', top: 50, left: 80, zIndex: 20, color: 'white' }}>
              TutorLion
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              {
                opacity: slideAnim,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [Dimensions.get('window').height, 0],
                    }),
                  },
                ],
                zIndex: 30,
              },
            ]}>
            <Button
              style={{ position: 'absolute', top: Dimensions.get('window').height / 2, left: 160 }}
              onPress={() => {
                setAuthOpen(!authOpen);
              }}>
              Sign in
            </Button>
          </Animated.View>
          <LottieView
            style={{ flex: 1, zIndex: 1 }}
            source={animation}
            autoPlay
            loop={false}
            resizeMode="cover"
            onAnimationFinish={fadeIn}
          />

          {authOpen == true && <Authenticator />}
        </>
      ) : (
        <View>
          <Text>SIGNED IN</Text>
          <SignOutButton />
        </View>
      )}
    </>
  );
}
