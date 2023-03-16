import React, { useState, useEffect } from 'react';
import { View,FlatList,StatusBar } from 'react-native';
import { Container, Content,  ListItem, Thumbnail, Text, Left, Body, Right,  Card } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { ActivityIndicator } from 'react-native-paper';

export default (props) => {
  const [loading, setloading] = useState(false)
  const { userDetails } = useSelector((state) => state.loginReducers);
  const [data, setData] = useState('')
  const [refreshData, setrefreshData] = useState(false)
  const  access_token= userDetails.token 
 
 useEffect(() => { req()}, [])

const req = () => {
  var axios = require('axios');
  setloading(true)
  setrefreshData(true)
  var config = {
    method: 'get',
    url: 'http://51.210.106.86:8383/wipip/v1/business/orders/history',
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };

  axios(config)
    .then(function (response) {
      console.log(response.data)
      setData(response.data)
      setloading(false)
      setrefreshData(false)
    })
    .catch(function (error) {
     
      setloading(false);
      setrefreshData(false);
    });
}
 


  
  return (
    <Container>
    <Content padder>
    <StatusBar backgroundColor="#ffbd11"   barStyle="light-content"/>
    {loading ?<View style={{justifyContent:'center' ,flex:1 ,marginTop:'40%'}}>
            <ActivityIndicator size='large'  color="#ffbd11" style={{ alignSelf: 'center', marginTop:20 }} /> 
          <Text style={{alignSelf:'center', fontSize:23, fontWeight:'bold' , color:'#ffbd11'}}>
           Delivery histories are Loading ...   
          </Text>
         </View> :
       data.length>0? 
      <FlatList  
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={data}
            onRefresh={()=>req()}
            refreshing={refreshData}
            renderItem={({ item, index }) => (
              <Card key={index}>
             <ListItem  thumbnail style={{ alignSelf:'center', borderBottomWidth:0 }}>
              <Left>
                <Thumbnail  resizeMode='contain' square source={{ uri: `${item.business.logo}`  }}   />
              </Left>
              <Body>
            <Text style={{fontSize:20, fontWeight:'bold'}} numberOfLines={2}>{moment(item.updatedAt, "YYYY-MM-DD hh:mm:ss").format('DD/MM/YYYY')}</Text>
            <Text note numberOfLines={1}>{item.barcode}</Text>
              </Body>
              <Right>
              <View style={{justifyContent:'center'}}>
                <Text style={{color:'blue', fontWeight:'bold', fontSize:20}}>
                  ${item.shippingPrice}
                </Text>

              </View>
              </Right>
            </ListItem></Card>)}/>:
         <View style={{justifyContent:'center' ,flex:1}}>
         <Text style={{alignSelf:'center', fontSize:23, fontWeight:'bold' ,marginTop:'40%', color:'#ffbd11'}}>
            No Order History 
         </Text>
        </View> 
        }
     
    </Content>
  </Container>
  );
}