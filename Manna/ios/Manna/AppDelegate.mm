#import "AppDelegate.h"

#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>
#import "RNCConfig.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSString *apiKey = [[RNCConfig envFor:@"GOOGLE_MAPS_API_KEY"] stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
  
  if (apiKey.length > 0) {
    [GMSServices provideAPIKey:apiKey];
  } else {
    NSLog(@"❌ GOOGLE_MAPS_API_KEY가 .env에서 설정되지 않았습니다!");
  }
  
  self.moduleName = @"Manna";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
