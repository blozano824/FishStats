import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';


// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

const tabs = [{
  label: 'Tanks',
  screen: 'FishStats.FishTanks',
  icon: require('../img/list.png'),
  title: 'Fish Tanks',
}, {
  label: 'Actions',
  screen: 'example.Actions',
  icon: require('../img/swap.png'),
  title: 'Navigation Actions',
}];

if (Platform.OS === 'android') {
  tabs.push({
    label: 'Transitions',
    screen: 'example.Transitions',
    icon: require('../img/transform.png'),
    title: 'Navigation Transitions',
  });
}

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#27ae60',
    tabBarButtonColor: '#ffffff',
    tabBarLabelColor: '#ffffff',
    tabBarSelectedButtonColor: '#2c3e50',
     tabBarSelectedLabelColor: '#2c3e50',
    tabFontFamily: 'BioRhyme-Bold',
  },
  drawer: {
    left: {
      screen: 'example.Types.Drawer'
    }
  }
});
