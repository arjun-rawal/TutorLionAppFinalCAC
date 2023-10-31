import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform, View } from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const LoginScreen = () => (
    <View style={{width:'100%',height:'100%', zIndex:1000, position:'relative'}}>
    <Appbar.Header>
       <Appbar.Content title="Title" subtitle={'Subtitle'} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
    </View>
);

export default LoginScreen;