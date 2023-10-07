import React, { useRef, useState, useCallback } from 'react';
import { View, Animated, Dimensions, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Amplify } from 'aws-amplify';
import { useFonts } from 'expo-font';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import animation from '../assets/ani4.json';
import Carousel from 'react-native-reanimated-carousel';

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

  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/Poppins-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  function IndexCarousel(props){
    switch (props.index){
        case 0: return <Image style={{width:null,height:width*0.5625}} source = {require("../assets/carouselImages/0.jpg")}  />
        case 1: return <Image style={{width:null,height:width*0.5625}} source = {require("../assets/carouselImages/1.jpg")}  />
        case 2: return <Image style={{width:null,height:width*0.5625}} source = {require("../assets/carouselImages/2.jpg")}  />
        case 3: return <Image style={{width:null,height:width*0.5625}} source = {require("../assets/carouselImages/3.jpg")}  />

    }
  }
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
              style={{ position: 'absolute', top: 80, left: 62, zIndex: 20, color: 'white', fontFamily:'Poppins' }}>
              TutorLion
            </Text>
          </Animated.View>

          <Animated.View style={{position:'absolute', alignItems:'center', zIndex:50, top: height/2.6, opacity:fadeAnim}}>
            <Carousel
                loop
                width={width}
                height={width * 0.5625}
                autoPlay={true}
                data={[...new Array(4).keys()]}
                scrollAnimationDuration={1000}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <IndexCarousel index={index}/>
                    </View>
                )}
            />
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
              mode='contained-tonal'
              buttonColor='#ff6800' 
              style={{fontFamily:"Poppins", position: 'absolute', top: Dimensions.get('window').height / 1.2, left: 160 }}
              onPressOut={() => {
                setAuthOpen(!authOpen);
              }}>
              Log in
            </Button>
            <Button
              mode='contained-tonal'
              buttonColor='#ff6800' 
                   
              style={{fontFamily:"Poppins", position: 'absolute', top: Dimensions.get('window').height / 1.2+50, left: 155 }}
              onPressOut={() => {
                setAuthOpen(!authOpen);
              }}>
              Sign up
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
