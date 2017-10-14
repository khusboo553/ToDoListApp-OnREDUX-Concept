import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,Button,ListView,TouchableHighlight,Image
} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { addDetails,selectedDetails,deleteDetails,editDetails } from '../Actions/addActions.js';
import Modal from 'react-native-modal';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
var self;

var ds=new ListView.DataSource({
  rowHasChanged:(row1,row2)=>row1!==row2,
});

var dataArray=[];
var value=[];
var listname;
var currentState;
var selectedEditItem;
//   {name:'xyzz',image:require('./ImageAsset/unchecked.png'),isSelected:'No'},
//   {name:'xyzz',image:require('./ImageAsset/unchecked.png'),isSelected:'No'},
//   {name:'xyzz',image:require('./ImageAsset/unchecked.png'),isSelected:'No'},
//   {name:'xyzz',image:require('./ImageAsset/unchecked.png'),isSelected:'No'},
//   {name:'xyzz',image:require('./ImageAsset/unchecked.png'),isSelected:'No'},
// ];

class HomeClass extends Component {
  constructor() {
      super();
      this.state={
           listName:'',
           dataSource:ds.cloneWithRows(dataArray),
           isModalVisible: false,
           text:'',
      }
  }
  _showModal = (rowData) =>{
    console.log("ioioio");
      console.log(rowData);
      selectedEditItem=rowData;
    this.setState({ isModalVisible: true ,text:rowData.name});

  }

   _hideModal = () =>{
     console.log("ioioio2222");
       console.log(selectedEditItem);
     this.setState({ isModalVisible: false })
     this._editAction(selectedEditItem);
   }

  componentDidUpdate(){

  }
  _editAction=(selectedEditItem)=>{

      var text_data=this.state.text;
      this.props.editDetails(selectedEditItem,text_data,this.props.users.listItemActions);
      value=currentState.users.listItemActions;
      console.log("uiuiui");
      console.log(value);
    //   this.setState({
    //   dataSource:ds.cloneWithRows(value),
    //  });
  }

  _addAction=()=>{
    listname=this.state.listName;
     this.props.addDetails(listname);

     value=currentState.users.listItemActions;

     this.setState({
     dataSource:ds.cloneWithRows(value),
    });
  }

  selectButtonAction=(rowData)=>{
    this.props.selectedDetails(rowData,value);
    this.setState({
       dataSource:ds.cloneWithRows(value),
    });
  }

  _allAction(){
    value=currentState.users.selectedItemActions;
     self.setState({
        dataSource:ds.cloneWithRows(value),
     });
  }


  _selectedAction(){
    var selectedArray=[];

    value=currentState.users.selectedItemActions;
    for (var i = 0; i < value.length; i++) {
      if (value[i]["isSelected"]=="Yes") {
            selectedArray.push(value[i]);
          }
    }

       if (selectedArray.length>0) {
           value=[...selectedArray].reverse();
       }else {
         value=[];
       }

       self.setState({
          dataSource:ds.cloneWithRows(value),
       });

  }

   _deleteAction=(rowData)=>{
     this.props.deleteDetails(rowData,this.props.users.listItemActions)
     this.setState({
        dataSource:ds.cloneWithRows(this.props.users.listItemActions),
     });
  }

  _deSelectedAction(){
    var deselectedArray=[];
    value=currentState.users.selectedItemActions;

    for (var i = 0; i < value.length; i++) {
      if (value[i]["isSelected"]=="No") {
            deselectedArray.push(value[i]);
          }
    }
       if (deselectedArray.length>0) {
           value=deselectedArray;
       }else {
         value=[];
       }

       self.setState({
          dataSource:ds.cloneWithRows(value),
       });
  }

  render() {
     self=this;

    return (
      <View style={{flex:1}}>
      <View style={styles.MainContainer}>
      <Text style={{marginTop:30,fontSize:20,fontWeight:'bold',textAlign:'center'}}>TO DO LIST APP</Text>
      <View style={styles.SubContainer}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:10,marginTop:20}}>
      <TextInput
        style={styles.textInputContainer}
        placeholder="Enter List Name"
        onChangeText={(listName) => this.setState({
        listName: listName
      })}
      />
      <Button
          onPress={this._addAction}
          title="Add"
          color="gray"
        />
    </View>
    <ListView
            renderHeader={this._renderHeader}
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={
                (rowData)=>(
                  <View>

                      <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:10}}>
                      <Text style={styles.lapNumber}>{rowData.name}</Text>
                      <View>
                      <TouchableHighlight onPress=
                            {() => this._showModal(rowData)}>
                     <Text style={{marginTop:10}}>EDIT</Text>
                     </TouchableHighlight>
                        <Modal isVisible={this.state.isModalVisible}>
                           <View style={{height:100,backgroundColor:'white'}}>
                           <TextInput
                             style={{height:40}}
                             onChangeText={(text) => this.setState({
                             text:text
                           })}
                           value={this.state.text}
                           />
                           <TouchableHighlight style={{marginBottom:10,marginLeft:150,marginRight:40}} onPress=
                                 {() => this._hideModal()}>
                          <Text style={{marginTop:10,color:'red'}}>OK</Text>
                          </TouchableHighlight>

                           </View>
                        </Modal>
                      </View>

                     <TouchableHighlight onPress=
                           {() => this._deleteAction(rowData)}>
                       <Text style={{marginTop:10}}>DELETE</Text>
                     </TouchableHighlight>

                      <TouchableHighlight onPress=
                            {() => this.selectButtonAction(rowData)}>
                            <Image
                         style={styles.checkBtnStyle}
                         source={rowData.image}
                         />
                     </TouchableHighlight>
                      </View>
                  </View>
              )}
            />
      <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:10,marginBottom:10}}>
      <Button
          onPress={this._allAction}
          title="ALL"
          color="gray"
        />
        <Button
            onPress={this._selectedAction}
            title="Selected"
            color="gray"
          />
          <Button
              onPress={this._deSelectedAction}
              title="De-Selected"
              color="gray"
            />
      </View>
      </View>
      </View>
      </View>
    );
  }
}
function mapStateToProps(state){

  currentState=state;
  return {
     users:state.users,
  };
}
//dispatch to store
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addDetails:addDetails,
    selectedDetails:selectedDetails,
    deleteDetails:deleteDetails,
    editDetails:editDetails
  },dispatch)
}

const styles=StyleSheet.create({
  checkBtnStyle:{
   marginTop:10,
    height:20,
    width:20,
},
  MainContainer:{
    backgroundColor:'rgba(206, 43, 62, 1)',
    flex:2,
  },
  SubContainer:{
    backgroundColor:'rgba(244, 228, 230,1)',
    flex:3,
  },
  textInputContainer:{

    width:window.width-60,
    borderBottomColor:'gray',
    flex:3,
    marginLeft:20,
    borderBottomWidth:1,
    borderBottomColor:'gray',
    marginBottom:10,

  },
  lapNumber:{
    marginTop:10,
    marginLeft:20,
    fontSize:17,
  },
})
export default connect(mapStateToProps, matchDispatchToProps)(HomeClass)
