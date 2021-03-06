import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, Linking, ScrollView, StyleSheet} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'App Info',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config       <ExpoConfigView />
*/
     const githubLink = () => {
       Linking.openURL('https://github.com/lauramar6261')
     }

   const data = () => {
     Linking.openURL('https://devs.upcitemdb.com/')
   }

    return (
      <ScrollView style={styles.container}>
      <Text style={styles.title}>
          {`Date Tracker \n\n`}
        </Text>
      <Text style={styles.attribution}>
          {`Created by: \n`}
            <Text style={styles.link} onPress={githubLink}>
              {`\n        lauramar6261 \n\n`}
              </Text>
          {`Product information provided by: \n`}
            <Text style={styles.link} onPress={data}>
              {`\n        UPCitemdb API \n\n`}
              </Text>
          {`Terminology: \n`}
              {`\n        The Period After Opening symbol identifies the useful lifetime of a cosmetic product after its package has been opened for the first time. \n\n`}
      </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  title: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attribution: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 50
  },
  link: {
    flex: 1,
    color: '#0099ff',
  },
})
