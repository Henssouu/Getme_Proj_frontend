import { useSelector } from 'react-redux';
import PostScreen from './PostScreen';
import { View } from 'react-native';


function LastPostScreen() {
  const post = useSelector((state) => state.post.value);


 
  const allPost = post.map((data, i) => {
    return <PostScreen key={i} {...data} />;
  });

  return (
    <View>
   {allPost}
   </View>
    
  );
}

export default LastPostScreen;