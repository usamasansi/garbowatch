
import { View, Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import {SliderBox} from 'react-native-image-slider-box'
import Image1 from '../assests/images/slider1.jpeg';
import Image2 from '../assests/images/garbowatch.png';
import Image3 from '../assests/images/garbowatch.png';

export default function ImageSlider (){
    const images =[
    require('../assests/images/slider1.jpeg'),
    require('../assests/images/garbage2.jpeg'),
    require('../assests/images/garbage3.jpeg')
    ]
  return (
    <View style={styles.container}>
      <SliderBox  style={styles.slider1} images={images}
              dotStyle={styles.dotStyle}
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={20}
              dotColor="#416833"
              autoplay
            


      />
        

    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'120%',
    bottom:35,
    justifyContent:'center',
    alignItems:'center',
    left:-40,
    
  },

  wrapper: {


  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
      
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
  },
  image: {
    width:410, // Adjust as needed
    height: 210, // Adjust as needed
    // Adding border radius
    bottom:230
  },
  slider1:{
    width:410, // Adjust as needed
    height: 210,
    borderRadius:30
  },
});


