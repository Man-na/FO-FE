import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, mainNavigations} from '@/constants';
import {
  AddMatchingCard,
  MatchCard,
  PopularFeedCard,
  PremiumPartyCard,
  SectionHeader,
} from '@/components/home';

export type Meeting = {
  id: number;
  date: string;
  location: string;
  status: string;
  participants: {
    males: {id: number; active: boolean}[];
    females: {id: number; active: boolean}[];
  };
  mood: string;
  timeRemaining: string;
};

type PremiumParty = {
  id: number;
  title: string;
  description: string;
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [expandedMeetingId, setExpandedMeetingId] = useState<number | null>(
    null,
  );

  const meetingsData: Meeting[] = [
    {
      id: 1,
      date: '2025.03.02(일)',
      location: '강남',
      status: '자동매칭',
      participants: {
        males: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: true},
          {id: 4, active: false},
        ],
        females: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: false},
          {id: 4, active: false},
        ],
      },
      mood: '다 같이 미친듯이 놀자! 🎮🔥',
      timeRemaining: '1일 12시간 05분',
    },
    {
      id: 2,
      date: '2025.03.10(월)',
      location: '홍대',
      status: '직접매칭',
      participants: {
        males: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: false},
          {id: 4, active: false},
        ],
        females: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: true},
          {id: 4, active: false},
        ],
      },
      mood: '술게임은 적당히, 대화 위주로! 🍷🗯️',
      timeRemaining: '2일 08시간 30분',
    },
  ];

  const premiumParties: PremiumParty[] = [
    {
      id: 1,
      title: '제목 제목 제목',
      description: '본문본문본문',
    },
    {
      id: 2,
      title: '제목 제목 제목',
      description: '본문본문본문',
    },
  ];

  const handleViewAll = (section: string): void => {
    console.log(`View all pressed for ${section}`);
  };

  const handleMatchPress = (meetingId: number): void => {
    setExpandedMeetingId(expandedMeetingId === meetingId ? null : meetingId);
  };

  const navigateToMatchingPage = (): void => {
    navigation.navigate(mainNavigations.MATCHING);
  };

  const displayedMeetings = meetingsData.slice(0, 3);
  const needsAddButton = displayedMeetings.length < 3;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <SectionHeader
          title="매칭현황"
          onViewAll={() => handleViewAll('매칭현황')}
        />
        <View style={styles.matchingHistoryContainer}>
          {displayedMeetings.map(meeting => (
            <MatchCard
              key={meeting.id}
              meeting={meeting}
              onPress={handleMatchPress}
              isExpanded={expandedMeetingId === meeting.id}
            />
          ))}
          {needsAddButton && (
            <AddMatchingCard onPress={navigateToMatchingPage} />
          )}
        </View>

        <SectionHeader
          title="실시간 인기글"
          onViewAll={() => handleViewAll('실시간 인기글')}
        />
        <PopularFeedCard />

        <SectionHeader
          title="프리미엄 파티"
          onViewAll={() => handleViewAll('프리미엄 파티')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.premiumScrollView}>
          <View style={styles.premiumCardContainer}>
            {premiumParties.map(party => (
              <PremiumPartyCard
                key={party.id}
                title={party.title}
                description={party.description}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  matchingHistoryContainer: {
    marginBottom: 16,
  },
  premiumScrollView: {
    marginBottom: 20,
  },
  premiumCardContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});
