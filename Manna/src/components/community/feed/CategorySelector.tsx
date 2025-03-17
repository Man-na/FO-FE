import {categories} from '@/constants';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const CategorySelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (id: number) => void;
}) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryLabel}>카테고리</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              value === item.id && styles.categoryItemSelected,
            ]}
            onPress={() => onChange(item.id)}>
            <Text
              style={[
                styles.categoryText,
                value === item.id && styles.categoryTextSelected,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  categoryItemSelected: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
  },
});
