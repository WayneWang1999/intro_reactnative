import {StyleSheet} from "react-native"

const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'yellow',
      flexDirection:'row'
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    scrollView: {
      alignItems: 'center',
      padding: 20,
    },
    button: {
      backgroundColor: '#6200EE',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    text: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    title:{
      fontSize:40,
      color:'indigo'
    },
   
  });

export default globalStyles
