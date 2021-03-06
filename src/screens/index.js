import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import FishTanks from './FishTanks';
import Actions from './Actions';
import Transitions from './Transitions';

import Push from './types/Push';
import Drawer from './types/Drawer';
import LightBoxTankOptions from './types/LightBoxTankOptions';
import LightBoxNewTank from './types/LightBoxNewTank';
import Notification from './types/Notification';
import Modal from './types/Modal';
import CustomTopBarScreen from './types/CustomTopBarScreen';
import TopTabs from './types/TopTabs';
import TabOne from './types/tabs/TabOne';
import TabTwo from './types/tabs/TabTwo';

import CollapsingHeader from './transitions/CollapsingHeader';
import SharedElementTransitions from './transitions/SharedElementTransitions';

import Cards from './transitions/sharedElementTransitions/Cards/Cards';
import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';

import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';

export function registerScreens() {
  Navigation.registerComponent('FishStats.FishTanks', () => FishTanks);
  Navigation.registerComponent('example.Actions', () => Actions);
  Navigation.registerComponent('example.Transitions', () => Transitions);

  Navigation.registerComponent('example.Types.Push', () => Push);
  Navigation.registerComponent('example.Types.Drawer', () => Drawer);
  Navigation.registerComponent('example.Types.Screen', () => Drawer);
  Navigation.registerComponent('example.Types.Modal', () => Modal);
  Navigation.registerComponent('FishStats.FishTanks.LightBoxTankOptions', () => LightBoxTankOptions);
  Navigation.registerComponent('FishStats.FishTanks.LightBoxNewTank', () => LightBoxNewTank);
  Navigation.registerComponent('example.Types.Notification', () => Notification);
  Navigation.registerComponent('example.Types.CustomTopBarScreen', () => CustomTopBarScreen);
  Navigation.registerComponent('example.Types.TopTabs', () => TopTabs);
  Navigation.registerComponent('example.Types.TopTabs.TabOne', () => TabOne);
  Navigation.registerComponent('example.Types.TopTabs.TabTwo', () => TabTwo);

  Navigation.registerComponent('example.Transitions.CollapsingHeader', () => CollapsingHeader);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions', () => SharedElementTransitions);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards', () => Cards);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry', () => Masonry);
  Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
