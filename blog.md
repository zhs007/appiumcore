# AppiumCore Development Log

### 2019-10-11

feizhu，首页主view的id是 ``com.taobao.trip:id/home_frg_refresh_view`` 。  
下面子节点的class为 ``	android.support.v7.widget.RecyclerView`` 。
再下面第一个 ``android.widget.FrameLayout`` 是轮播广告。  
第二个 ``android.widget.FrameLayout`` 就是大栏目。  
大栏目的布局是 ``android.widget.LinearLayout`` 。
然后是5个 ``android.widget.FrameLayout``、``android.widget.ImageView``、``android.widget.TextView``。  
其中如果有活动，会放在 ``android.widget.FrameLayout`` 里面。  
``android.widget.TextView`` 的 text 是 ``机票`` 的就是机票了。

今天查文档的时候，感觉``wd``库文档太弱了，发现其实还有个库，维护得比``wd``要勤一些，就是``webdriverio``，于是试了试这个库。  
``webdriverio``对``async/await``支持得要好，启动也更简单一些。  
然后就是selector的支持是直接放开的，也就是android可以用``UiSelector``来定位，这样查官方文档就好了，只要``Android UiAutomator``支持的功能，应该都能明确支持。

如无意外，后续应该会切换到``webdriverio``下。

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