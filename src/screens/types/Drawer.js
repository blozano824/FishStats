import React from 'react';
import {StyleSheet, View, Button, Text, ScrollView, Image, Dimensions} from 'react-native';
import Row from '../../components/Row';
import * as firebase from "firebase";

const {height, width} = Dimensions.get('window')

class MyClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: null
    };
    this.readDB()
  }

  onShowModal = () => {
    this.toggleDrawer();
    this.props.navigator.showModal({
      screen: 'example.Types.Modal',
      title: `Modal`
    });
  };

  onPushToFirstTab = () => {
    this.toggleDrawer();
    this.props.navigator.handleDeepLink({
      link: 'FishStats.FishTanks'
    });
  };

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left'
    });
  };

  readDB(){
    firebase.database()
    .ref("entries/"+(testDate.getMonth()+1)+"-"+testDate.getDate()+"-"+testDate.getFullYear())
    .on("value", (snapshot) => {
      if (snapshot.val() != null){
        let data = Object.values(snapshot.toJSON())
        this.setState({
          entries: data,
        });
      }
    })
  }

  collectNotifications(){
    notifications = []
    if (this.state.entries != null){
      for (let i = 0; i < this.state.entries.length; i++){
        console.log("checking temperature for entry " + i)
        notifications.push(this.generateNotification(i, this.state.entries[i].tankName, this.state.entries[i].temperature, 'temperature', 22, 26))
        notifications.push(this.generateNotification(i, this.state.entries[i].tankName, this.state.entries[i].dissolvedOxygen, 'dissolved oxygen level', 22, 23, 25, 26))
        notifications.push(this.generateNotification(i, this.state.entries[i].tankName, this.state.entries[i].ph, 'ph', 22, 23, 25, 26))
        notifications.push(this.generateNotification(i, this.state.entries[i].tankName, this.state.entries[i].TAN, 'ph', 22, 23, 25, 26))
        notifications.push(this.generateNotification(i, this.state.entries[i].tankName, this.state.entries[i].NH3, 'ph', 22, 23, 25, 26))
        notifications.push(this.generateNotification(i, this.state.entries[i].tankName, this.state.entries[i].NO2, 'ph', 22, 23, 25, 26))
      }
    }
    console.log(notifications)
    var notificationsEmpty = true
    for (let i = 0; i < notifications.length; i++){
      if (notifications[i] != undefined){
        notificationsEmpty = false
        console.log(notificationsEmpty)
      }
    }
    console.log(notificationsEmpty)
    if (notificationsEmpty == true){
      return <View style={styles.emptyContainer}><Text style={styles.emptyText}>{'Everything is all good.\nKeep it up!'}</Text></View>
    }
    return notifications
  }

  generateNotification(index, tankName, unit, unitName, rangeBottom, rangeTop){
    var rangeBottomWarning = rangeBottom+(0.4*(rangeTop-rangeBottom))
    console.log(rangeBottomWarning)
    var rangeTopWarning = rangeTop-(0.4*(rangeTop-rangeBottom))
    if (unit != undefined){
      if (unit < rangeBottom){
        return (<Row key={index+unitName} title={'Urgent: The ' + unitName + " for tank "+ tankName +" is below acceptable range."} urgent={true} warning={false}/>)
      }
      if (unit >= rangeBottom && unit < rangeBottomWarning){
        return (<Row key={index+unitName} title={'Warning: The ' + unitName + " for tank "+ tankName +" is nearing the lower acceptable range."} urgent={false} warning={true}/>)
      }
      if (unit >= rangeBottomWarning && unit <= rangeTopWarning){
      }
      if (unit > rangeTopWarning && unit <= rangeTop){
        return (<Row key={index+unitName} title={'Warning: The ' + unitName + " for tank "+ tankName +" is nearing the upper acceptable range."} urgent={false} warning={true}/>)
      }
      if (unit > rangeTop){
        return (<Row key={index+unitName} title={'URGENT: The ' + unitName + " for tank "+ tankName +" is above acceptable range."} urgent={true} warning={false}/>)
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{height: height*0.3, width: width*0.75, backgroundColor: '#bdc3c7'}} source={require("../../../img/organicfarm.jpg")} blurRadius={5} resizeMode="cover">
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(34,139,34,0.4)', }}>
            <Text style={{backgroundColor: 'rgba(0,0,0,0)', color: '#ffffff', fontSize: 25, fontWeight: '900', textAlign: 'center'}}>{"Dartmouth Organic\nFarm App"}</Text>
          </View>
        </Image>
        <View style={styles.notifications}>
          <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22, padding: 5}}>{'Notifications'}</Text>
        </View>
        <ScrollView style ={{borderRightWidth: 4, borderLeftWidth: 4, borderColor: '#27ae60'}}>
          {this.collectNotifications()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (width*0.75),
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16
  },
  sectionHeader: {
    flex: 1,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  notifications: {
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset:{  width: 0,  height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  emptyText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center'
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: height*0.275
  }
});

export default MyClass;
