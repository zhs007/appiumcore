# AppiumCore Development Log

### 2019-10-10

Android设备，启动Appium，一定需要传入appPackage和appActivity。

个人建议使用adb查看当前活跃Activity来获取这些信息，网上一般用 ``dumpsys activity | grep mFocusedActivity``，但貌似我查不到，我用 ``dumpsys activity | grep ActivityRecord`` 这个指令，能查到当前活跃的全部app，自己剔除掉后台应用就好。

``dumpsys window windows | grep mFocusedApp``，这个也可以用。

具体步骤如下：

1. 先确定adb连接是否正常，就是用adb查看当前设备，不管真机还是模拟器应该都能查到。

``` sh
adb devices
```

2. 进入 shell 模式。

``` sh
adb shell
```

3. 查询当前活动的app。

``` sh
dumpsys activity | grep ActivityRecord
```

这个查到的数据会比较多，但应该能看懂。

- 微信的配置

``` json
{
  "platformName": "Android",
  "appPackage": "com.tencent.mm",
  "appActivity": ".ui.LauncherUI",
  "deviceName": "OnePlus3T",
  "platformVersion": "9.0",
  "udid": "c104c463",
  "noReset": true
}
```

- 飞猪的配置

``` json
{
  "platformName": "Android",
  "appPackage": "com.taobao.trip",
  "appActivity": ".home.HomeActivity",
  "deviceName": "OnePlus3T",
  "platformVersion": "9.0",
  "udid": "c104c463",
  "noReset": true
}
```