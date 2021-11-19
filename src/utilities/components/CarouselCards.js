import React from 'react'
import {Image, StyleSheet, Text, View} from "react-native"
import Carousel, {Pagination} from 'react-native-snap-carousel'
import globalStyles from "../../styles/globalStyles";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const SLIDER_WIDTH = wp('90%');

const CarouselCards = ({data, isActiveIndex, getActiveIndex, pagination, containerStyle, imageStyle}) => {
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);

    const CarouselCardItem = ({item, index}) => {
        return (
            <View style={[styles.container, containerStyle]} key={index}>
                <Image
                    source={item.imgUrl}
                    style={imageStyle}
                />
                {item.title &&
                <Text style={[styles.header, globalStyles.headerText]}>{item.title}</Text>
                }
            </View>
        )
    }

    return (
        <View>
            <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                onSnapToItem={(index) => {
                    setIndex(index);
                    isActiveIndex && getActiveIndex(index);
                }}
                useScrollView={true}
                autoplay={true}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                loop={true}
            />
            {pagination &&
            <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: '#D2181B'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
                tappableDots={true}
            />
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        paddingTop: hp('2%')
    }
})


export default CarouselCards