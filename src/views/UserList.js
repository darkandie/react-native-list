import {Avatar, Button, Icon, ListItem} from '@rneui/base';
import React, {useContext} from 'react';
import {Alert, FlatList, View} from 'react-native';
import UsersContext from '../context/UsersContext';

const UserList = props => {
  const {state, dispatch} = useContext(UsersContext);

  const ConfirmUserDeletion = user => {
    Alert.alert('Excluir usuário', 'Deseja excluir este usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {
        text: 'Não',
      },
    ]);
  };

  const getActions = user => {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={20} color="green" />}
        />
        <Button
          onPress={() => ConfirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={20} color="red" />}
        />
      </>
    );
  };

  const getUserItem = ({item: user}) => {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};

export default UserList;
