export const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
  PROFILE: 'Profile',
  SETTING: 'Setting',
} as const;

export const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

export const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_MARKER: 'AddMarker',
  MARKER_DETAIL: 'MarkerDetail',
} as const;

export const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  ADD_FEED: 'AddFeed',
  EDIT_FEED: 'EditFeed',
  IMAGE_ZOOM: 'ImageZoom',
} as const;

export const settingNavigations = {
  SETTING_HOME: 'SettingHome',
  DELETE_ACCOUNT: 'DeleteAccount',
  EDIT_CATEGORY: 'EditCategory',
} as const;

export const profileNavigations = {
  PROFILE_HOME: 'ProfileHome',
  EDIT_PROFILE: 'EditProfile',
  EDIT_AVATAR: 'EditAvatar',
} as const;
