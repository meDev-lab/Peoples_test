import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  Pressable,
  FlatList,
} from 'react-native';

interface IPeople {
  navigation: any;
  route?: any;
}

const People: React.FC<IPeople> = ({navigation}) => {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApiData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://randomuser.me/api/?results=300',
      );
      if (response?.status === 200) {
        setusers(response?.data?.results);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Error', response.statusText);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Error',
        err?.message ?? 'Problems with the request, try again later!',
      );
    }
  };

  useEffect(() => {
    callApiData();
  }, []);

  const renderSeparator = () => {
    return <View style={styles.borderLine} />;
  };

  const renderItem = ({item}) => {
    const {name, email, picture} = item;
    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() => navigation.navigate('User', {...item})}>
        <Image style={styles.img} source={{uri: picture?.medium}} />
        <View style={styles.userData}>
          <Text>{`${name?.first} ${name?.last}`}</Text>
          <Text>{email}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        style={styles.listContainer}
        onRefresh={callApiData}
        refreshing={loading}
        keyExtractor={(_, index) => `index-${index}`.toString()}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Users ...</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  listContainer: {
    marginBottom: 50,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  borderLine: {
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  emptyText: {
    color: 'black',
    lineHeight: 32,
    textAlign: 'center',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  userData: {
    paddingLeft: 20,
    flexShrink: 1,
  },
});

export default People;
