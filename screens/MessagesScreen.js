import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MessagesScreen = () => {


return (
    <View>
   <Text style={styles.messagesScreen}>Messages screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({

    messagesScreen: {
        paddingTop: '15%',
    }

})


export default MessagesScreen;