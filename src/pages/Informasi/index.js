import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, ImageBackground, } from 'react-native';
import {ListOffices} from '../../components';
import {colors, fonts} from '../../utils';
import {
  DummyOffices1,
  DummyOffices2,
  DummyOffices3,
  ILOfficesBG,
} from '../../assets';
import {ListInformasi} from '../../components';
import {Fire} from '../../config';

const Informasi = ({navigation}) => {
  const [info, setInfo] = useState([]);
 
  useEffect(() => {
    Fire.database()
      .ref('info/')
      .once('value')
      .then(res => {
        if (res.val()) {
          setInfo(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  }, []);


  return (
    <View style={styles.page}>
      <ImageBackground source={ILOfficesBG} style={styles.background}>
        <Text style={styles.title}>Detail Informasi</Text>
        <Text style={styles.desc}>Alo Care</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {info.map(item => {
            return (
              <ListInformasi
                 key={`info-${item.id}`}
                title={item.title}
                price={item.price}
                image={item.image}
                onPress={() =>
                navigation.navigate('Detail', {item: title})
                  }
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Informasi;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
