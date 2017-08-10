import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, Alert} from 'react-native';
import Row from '../components/Row';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Navigation } from 'react-native-navigation';
import { sliderWidth, itemWidth, slideHeight } from '../Cards/CardEntry.style';
import SliderEntry from '../Cards/CardEntry';
import styles from '../Cards/Cards.style';
import { ENTRIES1, ENTRIES2 } from '../Cards/entries';
import * as firebase from "firebase";
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0ryRPPeWd-TIzq6JkqhT2a_nX2cVHX1U",
    authDomain: "fish-stats.firebaseapp.com",
    databaseURL: "https://fish-stats.firebaseio.com",
    projectId: "fish-stats",
    storageBucket: "fish-stats.appspot.com",
    messagingSenderId: "393092449198"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
console.ignoredYellowBox = ['Remote debugger'];

class FishTanks extends Component {

  static navigatorStyle = {
    navBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    navigationBarColor: '#27ae60',
    navBarBackgroundColor: '#27ae60',
    statusBarColor: '#27ae60',
    tabFontFamily: 'BioRhyme-Bold',
  };

  static navigatorButtons = {
    rightButtons: [
      {
        //title: '+', // for a textual button, provide the button title (label)
        icon: require('../../img/addIcon.png'), // for icon button, provide the local image asset name
        id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
        disableIconTint: false, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        //showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        //buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        //buttonFontSize: 40, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        //buttonFontWeight: '900', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ],
    leftButtons: [
      {
        //title: '+', // for a textual button, provide the button title (label)
        icon: require('../../img/navicon_menus.png'), // for icon button, provide the local image asset name
        id: 'warnings', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        //testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
        disableIconTint: false, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        //showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        //buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        //buttonFontSize: 40, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        //buttonFontWeight: '900', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  constructor(props) {
    super(props);
    this.database = firebase.database()
    // this.writeDB();
    this.state = {
      activeSlide: 0,
      entries: null,
      slidesLength: 0,
    }
    this.readDB()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  // writeDB(){
  //   testDate = new Date
  //   firebase.database()
  //     .ref("R3/"+testDate.getMonth()+"-"+testDate.getDate()+"-"+testDate.getFullYear())
  //     .set({
  //     temperature: '29°C'
  //     })
  // }

  readDB(){
    testDate = new Date
    firebase.database()
      .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear())
      .on("value", (snapshot) => {
        if (snapshot.val() == null){
          firebase.database()
            .ref("allTanks/")
            .on("value", (snapshot) => {
              firebase.database()
                .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear())
                .set(snapshot.val())
            })
        }
        if (snapshot.val() != null){
          console.log(snapshot.val())
          let arr = Object.values(snapshot.toJSON())
          console.log(arr)
          console.log(ENTRIES1)
          this.setState({
            entries: arr,
            slidesLength: arr.length
          });
        }
      })
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      const parts = event.link.split('/');
      if (parts[0] === 'tab1') {
        this.props.navigator.push({
          screen: parts[1]
        });
      }
    }
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'add') { // this is the same id field from the static navigatorButtons definition
        this.showLightBoxNewTank()
      }
      if (event.id == 'warnings') { // this is the same id field from the static navigatorButtons definition
        this.toggleDrawer()
      }
    }
  }

  showLightBoxNewTank = () => {
        Navigation.showLightBox({
            screen: "FishStats.FishTanks.LightBoxNewTank",
            passProps: {
                entriesLength: this.state.slidesLength,
                onClose: this.dismissLightBox
            },
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }
        });
    };

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });
  };

  pushScreen = () => {
    this.props.navigator.push({
      screen: 'example.Types.Push',
      title: 'New Screen',
    });
  };

  pushCustomTopBarScreen = () => {
    this.props.navigator.push({
      screen: 'example.Types.CustomTopBarScreen'
    });
  };

  pushTopTabsScreen = () => {
    this.props.navigator.push({
      screen: 'example.Types.TopTabs',
      title: 'Top Tabs',
      topTabs: [{
        screenId: 'example.Types.TopTabs.TabOne',
        title: 'Tab One',
      }, {
        screenId: 'example.Types.TopTabs.TabTwo',
        title: 'Tab Two',
      }],
    });
  };

  showModal = () => {
    this.props.navigator.showModal({
      screen: 'example.Types.Modal',
      title: 'Modal',
    });
  };

  showLightBox = () => {
    this.props.navigator.showLightBox({
      screen: "example.Types.LightBox",
      passProps: {
        title: 'LightBox',
        content: 'Hey there, I\'m a light box screen :D',
        onClose: this.dismissLightBox,
      },
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        tapBackgroundToDismiss: true
      }
    });
  };

  dismissLightBox = () => {
    this.props.navigator.dismissLightBox();
  };

  showInAppNotification = () => {
    this.props.navigator.showInAppNotification({
      screen: 'example.Types.Notification',
    });
  };

  // render() {
  //   return (
  //     <ScrollView style={styles.container}>
  //       <Row title={'Toggle Drawer'} onPress={this.toggleDrawer}/>
  //       <Row title={'Push Screen'} testID={'pushScreen'} onPress={this.pushScreen}/>
  //       <Row title={'Custom TopBar'} onPress={this.pushCustomTopBarScreen}/>
  //       <Row title={'Top Tabs Screen'} onPress={this.pushTopTabsScreen} platform={'android'}/>
  //       <Row title={'Show Modal'} onPress={this.showModal}/>
  //       <Row title={'Show Lightbox'} onPress={this.showLightBox}/>
  //       <Row title={'Show In-App Notification'} onPress={this.showInAppNotification}/>
  //     </ScrollView>
  //   );
  // }

  getSlides (entries) {
        if (!entries) {
            return false;
        }

        this.props.navigator.setTabBadge({
            tabIndex: 0,
            badge: entries.length,
        });

        return entries.map((entry, index) => {
            return (
                <SliderEntry
                  key={`carousel-entry-${index}`}
                  even={(index + 1) % 2 === 0}
                  index = {index}
                  databaseLength = {this.state.slidesLength}
                  {...entry}
                />
            );
        });
    }

    getPagination (entries) {
        const { activeSlide, slidesLength } = this.state;
        return (
            <Pagination
              dotsLength={slidesLength}
              activeDotIndex={activeSlide}
              containerStyle={{height: 5}}
              dotStyle={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  marginHorizontal: 8,
                  backgroundColor: '#27ae60'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    get example1 () {
        return (
            <View style={{paddingTop: 0}}>
              { this.getPagination(ENTRIES1) }
              <StatusBar
              barStyle="light-content"
            />
            <Carousel
              enableMomentum={true}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={0}
              inactiveSlideScale={0.9}
              inactiveSlideOpacity={0.6}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={true}
              snapOnAndroid={true}
              removeClippedSubviews={true}
              vertical={false}
              decelerationRate={0.991}
              swipeThreshold={45}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            >
                { this.getSlides(this.state.entries) }
            </Carousel>
            
            </View>
        );
    }

    render () {
        return (
            <View style={styles.container}>
                    { this.example1 }
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   row: {
//     height: 48,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0, 0, 0, 0.054)',
//   },
//   text: {
//     fontSize: 16,
//   },
// });

export default FishTanks;
