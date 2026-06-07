import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { auth } from './source/firebase/config';

import Login from './source/screens/Login';
import Register from './source/screens/Register';
import Home from './source/screens/home';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUsuario(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}