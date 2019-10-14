# AppiumCore Development Log

### 2019-10-14

``appium desktop``容易卡主，网易的``airtest``感觉好多了。  
其实从数据分析来看，应该都能看明白。  
暂时用``airtest``来可视化分析，自动化还是用``appium``吧。

feizhu，特价机票页，看起来应该是weex的。  
``com.taobao.trip:id/weex_render_view``这个是主view。  
这个往下一直找到一个``android.widget.FrameLayout``有3个子节点的。  
第一个子节点就是搜索区，这里看起来是第一个子节点的第3个子节点。  
``android.view.View``几个主要的选项都是这个类型的。

appium的代码写起来很纠结，大概理解它为啥写成这样了，google的uiautomator其实是在手机端运行的，所以它可以很方便的父子节点交互，而appium为了考虑兼容性，大量的协议通过selector来得到elementid，然后操作，复杂点的属性操作，都要再通过手机端的app转一次。  
这样的结构其实我也能接受，只要能给我个接口，把 dumpWindowHierarchy 接口数据给我，我能自己解析出elementid，剩下的事就全省了，但appium竟然没这个接口，或者说现在的几个client都没这个接口，好像desktop能拿到这个数据啊。

其实还有个更省事的办法，干脆我直接用java写在手机上的app，通过uiautomator控制app，然后作为client，直接和服务器交互，这样可能更省事一些。

### 2019-10-12

feizhu，机票页  
主view的id是 ``com.taobao.trip:id/flight_home_template`` 。  
下面3个部分，分别是买票区（``android.widget.RelativeLayout``）、广告（``android.widget.FrameLayout``）、特价机票（``android.widget.FrameLayout``）。  

``com.taobao.trip:id/flight_home_search_base_card_layout``是买票区的主view。  
``com.taobao.trip:id/flight_home_search_tablayout_container``这个是用来切换单程、往返、多程的，这几个都是 ``com.taobao.trip:id/tv_flight_search_tab_item_title``，只有``text``不一样。  
``com.taobao.trip:id/flight_fl_container``这个是选择区。  
``com.taobao.trip:id/flight_btn_search``这个是搜索按钮。  
``com.taobao.trip:id/flight_search_city``这个是城市选择。  
``com.taobao.trip:id/flight_date``这个是日期选择。  
``com.taobao.trip:id/stv_more``这个是更多特价。  

今天遇到一个比较奇怪的问题，就是有些时候，会找不到element，不是等待时间的问题，这块现在看来感觉还好，而是怎么都找不到。  
原因未知。  
``appium desktop``小bug也挺多的，会卡主，然后如果是weex的控件，好像会点不了，点击就卡主。  

然后就是appium，自己有超时，如果一段时间没消息，就结束session了。

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