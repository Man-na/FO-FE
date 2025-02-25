/* eslint-disable react-native/no-inline-styles */
import {AvatarItem} from '@/components/common/AvatarItem';
import {Tab} from '@/components/common/Tab';
import {colors} from '@/constants';
import {useGetAvatarList} from '@/services/avatar';
import {s3BaseUrl} from '@/utils';
import React, {useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {SvgUri} from 'react-native-svg';

function EditAvatarScreen(): React.JSX.Element {
  const pagerRef = useRef<PagerView | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const {
    hats = [],
    faces = [],
    tops = [],
    bottoms = [],
    hands = [],
    skins = [],
  } = useGetAvatarList();
  const [avatarItem, setAvatarItem] = useState({
    hatId: '',
    faceId: '',
    topId: '',
    bottomId: '',
    handId: '',
    skinId: '01',
  });

  const getImageId = (url: string) => {
    const filename = url.split('/').pop() ?? '';
    const [id] = filename.split('.');
    return id;
  };

  const filterValidImages = (urls: string[] = []) => {
    return urls.filter(url => /\.(png|svg)$/i.test(url));
  };

  const handlePressItem = (name: string, item: string) => {
    const newId = getImageId(item);
    setAvatarItem(prev => {
      const updated = {...prev, [name]: newId};
      console.log('Updated avatarItem:', updated);
      return updated;
    });
  };

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  const getAvatarItemUrl = (category: string, id?: string) => {
    console.log(category, id);
    if (category === 'default' || !id) {
      return `${s3BaseUrl}/default/frame.svg`;
    }
    return `${s3BaseUrl}/items/${category}/${id}.svg`;
  };

  const filteredHats = filterValidImages(hats);
  const filteredFaces = filterValidImages(faces);
  const filteredTops = filterValidImages(tops);
  const filteredBottoms = filterValidImages(bottoms);
  const filteredHands = filterValidImages(hands);
  const filteredSkins = filterValidImages(skins);

  const categories = [
    {data: filteredHats, name: 'hatId', id: avatarItem.hatId},
    {data: filteredFaces, name: 'faceId', id: avatarItem.faceId},
    {data: filteredTops, name: 'topId', id: avatarItem.topId},
    {data: filteredBottoms, name: 'bottomId', id: avatarItem.bottomId},
    {data: filteredHands, name: 'handId', id: avatarItem.handId},
    {data: filteredSkins, name: 'skinId', id: avatarItem.skinId},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            {avatarItem.hatId && (
              <SvgUri
                uri={getAvatarItemUrl('hats', avatarItem.hatId)}
                style={[styles.avatar, {zIndex: 70}]}
              />
            )}
            {avatarItem.faceId && (
              <SvgUri
                uri={getAvatarItemUrl('faces', avatarItem.faceId)}
                style={[styles.avatar, {zIndex: 60}]}
              />
            )}
            {avatarItem.topId && (
              <SvgUri
                uri={getAvatarItemUrl('tops', avatarItem.topId)}
                style={[styles.avatar, {zIndex: 50}]}
              />
            )}
            {avatarItem.bottomId && (
              <SvgUri
                uri={getAvatarItemUrl('bottoms', avatarItem.bottomId)}
                style={[styles.avatar, {zIndex: 40}]}
              />
            )}
            <SvgUri
              uri={getAvatarItemUrl('default')}
              style={[styles.avatar, {zIndex: 30}]}
            />
            {avatarItem.skinId && (
              <SvgUri
                uri={getAvatarItemUrl('skins', avatarItem.skinId)}
                style={[styles.avatar, {zIndex: 20}]}
              />
            )}
            {avatarItem.handId && (
              <SvgUri
                uri={getAvatarItemUrl('hands', avatarItem.handId)}
                style={[styles.avatar, {zIndex: 10}]}
              />
            )}
          </View>
        </View>
        <View style={styles.tabContainer}>
          {['모자', '얼굴', '상의', '하의', '손', '피부'].map((tab, index) => (
            <Tab
              key={index}
              isActive={currentTab === index}
              onPress={() => handlePressTab(index)}>
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={e => setCurrentTab(e.nativeEvent.position)}>
          {categories.map((list, index) => (
            <View key={index} style={styles.page}>
              <FlatList
                data={list.data}
                keyExtractor={item => item}
                numColumns={3}
                contentContainerStyle={styles.listContainer}
                renderItem={({item}) => (
                  <AvatarItem
                    uri={item}
                    isSelected={getImageId(item) === list.id}
                    onPress={() => handlePressItem(list.name, item)}
                  />
                )}
              />
            </View>
          ))}
        </PagerView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.PINK_200,
    width: '100%',
    height: 115,
    marginBottom: 115,
  },
  avatarContainer: {
    width: 229,
    height: 229,
    borderRadius: 229,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    backgroundColor: colors.WHITE,
  },
  avatar: {
    width: 229,
    height: 229,
    position: 'absolute',
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.WHITE,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

export default EditAvatarScreen;
