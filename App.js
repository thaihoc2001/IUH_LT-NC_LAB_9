import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated, TouchableOpacity, Text, SafeAreaView, Easing } from 'react-native';
import React, { useRef } from "react";
import Icon from "@expo/vector-icons/Ionicons";


export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(400)).current;
  const spinValue = new Animated.Value(0);
  const positionSpinValue = new Animated.Value(0);


  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();
  };

  const faceFly = () => {
    const number = Math.random();
    Animated.timing(positionAnim, {
      toValue: 100 * number,
      easing: Easing.linear,
      duration: 1000
    }).start(() => faceFly);
  }

  const spin = () => {
    Animated.loop(Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        // useNativeDriver: true
      }
    ),
    Animated.timing(
      positionAnim,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.back,
        // useNativeDriver: true
      }
    )).start()
  }

  const faceCancel = () => {
    Animated.timing(positionAnim, {
      toValue: 400,
      duration: 1000
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();
  }

  const stopSpin = () => {
    spinValue.stopAnimation((value) => {
      spinValue.setValue(value);
    });
  }
  const spinC = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg']
  })
  const positionSpinValueC = positionSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [180, 180]
  })
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim,
            position: 'absolute',
            top: positionAnim,
          }
        ]}
      >
        <Text>Welcome to Animation React Native</Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            transform: [{ rotate: spinC }, { translateY: positionSpinValueC }],
            position: 'absolute',
            top: 350,
          }
        ]}
      >
        <Icon name="airplane-outline" size={80} color={'#000'}/>
      </Animated.View>
      <SafeAreaView style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity style={{ backgroundColor: '#2196F3', padding: 20, marginHorizontal: 20, paddingHorizontal: 60, marginTop: 5 }} onPress={fadeIn} >
          <Text>Show</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#CD104D', padding: 20, marginHorizontal: 20, paddingHorizontal: 60, marginTop: 5 }} onPress={fadeOut} >
          <Text>Hide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#128F91', padding: 20, marginHorizontal: 20, paddingHorizontal: 60, marginTop: 5 }} onPress={faceFly} >
          <Text>Move</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#08DBF7', padding: 20, marginHorizontal: 20, paddingHorizontal: 60, marginTop: 5 }} onPress={spin} >
          <Text>Fly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#F7452E', padding: 20, marginHorizontal: 20, paddingHorizontal: 60, marginTop: 5 }} onPress={faceCancel} >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#F7452E', padding: 20, marginHorizontal: 20, paddingHorizontal: 60, marginTop: 5 }} onPress={stopSpin} >
          <Text>Stop</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
});
