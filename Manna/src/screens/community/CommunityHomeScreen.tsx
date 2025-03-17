import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors, communityNavigations} from '@/constants';
import {CommunityStackParamList} from '@/navigation/stack/CommunityStackNavigator';

type Navigation = StackNavigationProp<CommunityStackParamList>;

export const CommunityHomeScreen = () => {
  const navigation = useNavigation<Navigation>();

  const categories = [
    {id: 1, title: '자유게시판', screen: communityNavigations.FREE_FEED},
    {id: 2, title: '대학생 게시판', screen: communityNavigations.STUDENT_FEED},
    {id: 3, title: '직장인 게시판', screen: communityNavigations.WORKER_FEED},
    {
      id: 4,
      title: '프리미엄 파티',
      screen: communityNavigations.PREMIUM_PARTY_FEED,
    },
  ];

  const navigateToScreen = (
    screen:
      | 'FreeFeed'
      | 'StudentFeed'
      | 'WorkerFeed'
      | 'PremiumPartyFeed'
      | null,
  ) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>공지사항</Text>
        </View>

        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            TEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXTTEXTTEXTTEXTTEXTTEXTTEXT
          </Text>
        </View>

        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>카테고리</Text>
        </View>

        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => navigateToScreen(category.screen)}>
            <Text style={styles.categoryButtonText}>{category.title}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.realtimeHeader}>
          <Text style={styles.realtimeTitle}>실시간 인기글</Text>
          <TouchableOpacity>
            <Text style={styles.moreText}>더보기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popularPostsContainer}>
          <View style={styles.popularPost}>
            <View style={styles.crossedCircle}>
              <Text style={styles.crossedText}>✕</Text>
            </View>
            <Text style={styles.postLabel}>닉네임</Text>
            <Text style={styles.postLabel}>2025.03.13</Text>
            <Text style={styles.postTitle}>제목 제목 제목</Text>
            <Text style={styles.postContent}>본문본문본문본문본문본문본문</Text>
            <View style={styles.postFooter}>
              <Text style={styles.footerText}>대학생 게시판</Text>
              <View style={styles.voteContainer}>
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={16}
                  color={colors.GRAY_300}
                />
                <Text style={styles.voteCount}>10</Text>
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={16}
                  color={colors.GRAY_500}
                />
                <Text style={styles.voteCount}>10</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  circleNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.PINK_500,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  circleNumberText: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noticeContainer: {
    padding: 16,
    backgroundColor: colors.PINK_200,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
  },
  noticeText: {
    color: colors.GRAY_500,
    fontSize: 14,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  categoryButton: {
    backgroundColor: colors.PINK_200,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
  },
  categoryButtonText: {
    fontSize: 15,
    color: colors.BLACK,
  },
  realtimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
  },
  realtimeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  moreText: {
    fontSize: 12,
    color: colors.GRAY_300,
    marginLeft: 'auto',
    marginRight: 8,
  },
  popularPostsContainer: {
    padding: 16,
  },
  popularPost: {
    backgroundColor: colors.PINK_200,
    padding: 16,
    borderRadius: 8,
  },
  crossedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  crossedText: {
    color: colors.GRAY_300,
    fontSize: 12,
  },
  postLabel: {
    fontSize: 12,
    color: colors.GRAY_500,
    marginBottom: 4,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 4,
  },
  postContent: {
    fontSize: 13,
    color: colors.GRAY_700,
    marginBottom: 8,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteCount: {
    fontSize: 12,
    color: colors.GRAY_500,
    marginHorizontal: 4,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
    paddingVertical: 8,
    backgroundColor: colors.PINK_200,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  tabText: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginTop: 2,
  },
});
