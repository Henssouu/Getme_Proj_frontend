import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan, faHeart  } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, deletePost } from '../reducers/post';
import moment from 'moment';



function PostScreen (props) {
    const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

 
  const handleLike = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/posts/like`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, postId: props._id }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(likePost({ postId: props._id, pseudo: user.pseudo }));
      });
  };

  const handleDelete = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/posts`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, postId: props._id }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(deletePost(props._id));
      });
  };

  let likeStyle = {};
  console.log('props', props)
  console.log(props.likes.some(e => e.pseudo === user.pseudo));
  if (props.likes.some(e => e.pseudo === user.pseudo)) {
    likeStyle = { 'color': '#ec6e5b' };
  }

  return (
    <View style={styles.container}>
      <View style={styles.position}>
        <Image style={styles.images} source={{uri: props.author.photo}}></Image>
        <View style={styles.contentPosition}>
          <View style={styles.userInfo}>
          <Text style={styles.name}>{props.author.nom} {props.author.prenom}</Text>
          <Text style={styles.greyText}>@{props.author.pseudo} · <Text style={styles.greyText}>{moment(props.createdAt).fromNow()}</Text></Text> 
          </View>
          <View style={styles.post}><Text>{props.content}</Text></View>
          </View>
          </View>
    
<View style={styles.iconPosition}>
<View style={styles.likes}>
      <Pressable onPress={() => handleLike()}><FontAwesomeIcon icon={faHeart}  style={likeStyle} /></Pressable>
      <Text>{props.likes.length}</Text>
</View>
      {props.author.pseudo === user.pseudo && <Pressable onPress={() => handleDelete()}><FontAwesomeIcon icon={faTrashCan}  style={styles.delete} /></Pressable>}
      </View>
    </View>
  );
  }
  const styles = StyleSheet.create({
container: {
        border: 'rgba(114, 131, 148, 0.455)',
        borderWidth: 1,
        padding: 20,
      },
      
   
      
      delete: {
        marginLeft: 10,
        color: 'grey',
      },
  
      
      greyText: {
        color: 'rgb(114, 131, 148)',
      },
      iconPosition: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }, 
      likes: {
        flex: 1,
        flexDirection: 'row',
        
        
      },
      images: {
        width: 100,
        height: 100,
        borderRadius: 15,
      },
      position: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'center',

      },
      contentPosition: {
        flex: 1,

        marginLeft: '10%',
        marginTop: '5%',
      },
      userInfo: {
        marginBottom: '10%',
      }
      


  });


export default PostScreen;
