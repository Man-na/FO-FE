package com.manna

import com.facebook.react.ReactActivity
import android.os.Bundle
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "Manna"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(
          this,
          mainComponentName,
          DefaultNewArchitectureEntryPoint.getFabricEnabled()
      )
      
  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(null)
  }
}
