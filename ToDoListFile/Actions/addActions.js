var dataArray=[];
var value=[];

export const addDetails = (listname) => {

  if (dataArray.length>0) {
    var dataListArray={
      name:listname,
      image:require('./ImageAsset1/unchecked.png'),
      isSelected:'No'
    };
    dataArray.push(dataListArray);
  }
  else {
    var dataListArray=[{
      name:listname,
      image:require('./ImageAsset1/unchecked.png'),
      isSelected:'No'
    }];
    dataArray=dataListArray;
  }

   value=[...dataArray].reverse();
   listname=value;

  return {
    type: "List_Item",
    payload: listname
  }
};

export const selectedDetails = (rowData,valueData) => {

  for (var i = 0; i < valueData.length; i++) {
     if (valueData[i]==rowData) {
       if (rowData["isSelected"]=="No") {
        valueData[i]["isSelected"]="Yes";
        valueData[i]["image"]=require('./ImageAsset1/checked.png');

      }else {
        valueData[i]["isSelected"]="No";
        valueData[i]["image"]=require('./ImageAsset1/unchecked.png');
      }
     }
  }
  return {
    type: "selected_Item",
    payload: valueData
  }
};

export const deleteDetails = (rowData,valueData) => {

  for (var i = 0; i < valueData.length; i++) {
     if (valueData[i]==rowData) {
       var value_Data=valueData.splice(i, 1);
      var value_Data=dataArray.splice(i,1);
      }
   }

  return {
    type: "Delete_Item",
    payload: valueData
  }
};

export const editDetails = (rowData,text_data,valueData) => {
  console.log("final result1");
 console.log(rowData);
 console.log(valueData);

  for (var i = 0; i < valueData.length; i++) {
     if (valueData[i]==rowData) {
        valueData[i]["name"]=text_data;
      }
   }
  //  value=[...dataArray].reverse();

   console.log("final result");
  console.log(valueData);
  return {
    type: "Edit_Item",
    payload: valueData
  }
};
