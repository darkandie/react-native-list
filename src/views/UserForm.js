import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import UsersContext from '../context/UsersContext';

const UserForm = ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {});

  const {dispatch} = useContext(UsersContext);

  return (
    <View style={styles.form}>
      <Text>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setUser({...user, name})}
        placeholder="Informe o nome"
        value={user.name}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={email => setUser({...user, email})}
        placeholder="Informe o e-mail"
        value={user.email}
      />
      <Text>Imagem</Text>
      <TextInput
        style={styles.input}
        onChangeText={avatarUrl => setUser({...user, avatarUrl})}
        placeholder="Informe a url do seu avatar"
        value={user.avatarUrl}
      />
      <Button
        title="Salvar"
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
  },
});

export default UserForm;
