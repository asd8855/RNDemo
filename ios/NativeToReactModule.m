//
//  NativeToReactModule.m
//  navigation
//
//  Created by libo on 2018/9/29.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "NativeToReactModule.h"
#import "NativeViewController.h"
#import "AppDelegate.h"
@implementation NativeToReactModule

RCT_EXPORT_MODULE();
- (NSArray <NSString *> *)supportedEvents {
  return @[@"NativePushToReact"];
}

// native跳转至react
RCT_EXPORT_METHOD(startObservingPush) {
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(nativePushToReactNotification:) name:@"NativePushToReactNotification" object:nil];
}

// react跳转至native
RCT_EXPORT_METHOD(reactPushToNative) {
  dispatch_async(dispatch_get_main_queue(), ^{
    NativeViewController *nativeVC = [[NativeViewController alloc]init];
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate.nav pushViewController:nativeVC animated:YES];
  });
}


-(void)nativePushToReactNotification:(NSNotification *)noti {
  [self sendEventWithName:@"NativePushToReact" body:noti.object];
}

@end
