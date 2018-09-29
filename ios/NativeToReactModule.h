//
//  NativeToReactModule.h
//  navigation
//
//  Created by libo on 2018/9/29.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeToReactModule : RCTEventEmitter<RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
