/**
 * author: Martin SD
 */
const React = require("react-native");
import { Platform } from 'react-native';

const { StyleSheet, Dimensions } = React;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    backgroundColor: "#ebe9e9"
  },
  imageContainer: {
    width: deviceWidth, height: 190
    // , flex: 1, resizeMode:'stretch'
  },
  home_header: {
    backgroundColor: "#0097de"
  },
  home_icon: {
    color: "#777"
  },
  headerLogo: {
    width:35, height:50
  },
  btn_notif: {
    left:10
  },
  headerBody: {
    flex:1, flexDirection:'row', justifyContent: 'center'
  },
  badge: {
    top: -4,left:-10,
    height:20, justifyContent: 'center', padding:2
  },
  badge_text: {
    fontSize:12, top: 0
  },
  card_container: {backgroundColor:'#0097de', borderRadius:12, borderWidth:1, borderColor:'#0097de', paddingHorizontal:12},
  card_type: {
    fontSize: 18,
    color:'#fff'
  },
  username: {
    fontSize: 18
  },
  home_img: {
    width:70,height:70
  },
  home_avatar: {
    width:100,height:100,marginBottom:5,
    borderRadius: 6, borderWidth:2, borderColor: '#fff'
  },
  separator: {
    height:4,width:deviceWidth/2,backgroundColor:'#666',marginTop:5
  },
  //
  thumbContainer: {
    backgroundColor:'#fff', margin: 10, width:null,
    alignSelf:'stretch', borderRadius: 6, flex:1,
    justifyContent: 'space-between', bottom:0, height: deviceHeight - 290
  },
  grid: {
    flex:1, alignSelf:'stretch', justifyContent: 'space-between'
  },
  col: {
    alignItems: "center", justifyContent: 'space-between',
    paddingHorizontal: 3
  },
  row: {
    alignItems: "center",
    justifyContent: 'space-between'
  },
  row1: {top:20},
  btnYes: {
    marginBottom: Platform.OS === 'ios' ? 10 : 0

  }
};
