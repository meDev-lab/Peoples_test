import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert, Image, Pressable} from 'react-native';

interface IUser {
  navigation: any;
  route?: any;
}

interface IUserData {
  name: {
    first: string;
    last: string;
  };
  picture: {
    medium: string;
  };
  email: string;
  phone: string;
  dob: {
    age: string;
  };
  location: {
    country: string;
    city: string;
    street: {
      name: string;
      number: string;
    };
  };
}

const User: React.FC<IUser> = ({route}) => {
  const [userData, setUserdata] = useState<IUserData>();

  useEffect(() => {
    setUserdata(route?.params);
  }, [route]);

  console.log(route?.params, 'ppp');

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image style={styles.img} source={{uri: userData?.picture?.medium}} />
        <View style={styles.userData}>
          <Text style={styles.headStyle}>User:</Text>
          <Text>{`${userData?.name?.first} ${userData?.name?.last}`}</Text>
          <Text>Email: {userData?.email}</Text>
          <Text>Phone: {userData?.phone}</Text>
          <Text>Age: {userData?.dob?.age}</Text>

          <Text style={styles.headStyle}>Address:</Text>
          <Text>
            {`${userData?.location?.country}, ${userData?.location?.city}, ${userData?.location?.street?.name}, ${userData?.location?.street?.number}`}
          </Text>
        </View>
      </View>
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
    width: 100,
    height: 100,
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
  headStyle: {
    marginTop: 5,
    fontSize: 18,
  },
});

export default User;
