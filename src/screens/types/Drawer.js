import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

class MyClass extends React.Component {

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
      link: 'tab1/example.Types.Push'
    });
  };

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center", fontSize: 30, fontWeight: '700'}}>{"Warnings and Suggestions\nComming Soon!"}</Text>
        {/* <View style={styles.button}>
          <Button
            onPress={this.onShowModal}
            title="Show Modal"/>
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.onPushToFirstTab}
            title="Push to First Tab"/>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16
  }
});

export default MyClass;
