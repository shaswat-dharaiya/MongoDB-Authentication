import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText:{
        fontSize: 35, 
        marginLeft: 19,
        marginTop: 30,
    },
    text:{
        fontSize: 35, 
        marginLeft: 19,
        marginTop: 10,
        color: '#909',        
    },
    header:{
        borderBottomColor: '#909',
        borderBottomWidth: 4,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 70,
    },
    inputTextlabel:{
        fontSize: 20,
        marginLeft: 18,
        marginTop:20,
    },
    inputText:{
        // backgroundColor: '#ddd',
        marginLeft:18,
        marginRight:18,
        marginTop:18,    
        // color: '#000',
        // marginHorizontal: 10,
        // // marginHorizontal: 10,
        // paddingVertical: 15,
        // borderWidth: 1,
        // borderColor: '#000',
        // borderRadius: 20,
        // textAlign: 'center'
    },
    button:{
        marginLeft:18,
        marginRight:18,
        marginTop:18,  
    },
    touchableOpacity:{
        marginLeft:18,
        marginRight:18,
        marginTop:18,
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#ddd'
    },
    loadingScreen:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    header:{

    }
})

const bgdColor = '#999';

const screenOptionStyle = {
    headerTitleAlign: 'center',
    headerTintColor: '#111',
    headerBackTitle: "Back",
    headerStyle: { backgroundColor: bgdColor, height: 80,},
    headerLeft: () => {null}        
}

export {globalStyles, screenOptionStyle}