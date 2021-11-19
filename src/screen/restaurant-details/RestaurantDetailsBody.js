import React, {} from "react";
import { View, } from "react-native";

import globalStyles from "../../styles/globalStyles";
import BookingModal from "./table-booking/BookingModal";
import RestaurantDetailsHeader from "./RestaurantDetailsHeader";
import CartModal from "./cart-modal/CartModal";
import SpecialOffer from "./special-offer/SpecialOffer";
import ViewBasket from "./ViewBasket";
import RestaurantService from "./RestaurantService";
import RestaurantCategory from "./RestaurantCategory";
import RestaurantCategoryItems from "./RestaurantCategoryItems";

const RestaurantDetailsBody = ({ restaurantInfo }) => {
    return (
        restaurantInfo && Object.keys(restaurantInfo).length > 0 && <>
            <View style={[globalStyles.container, globalStyles.paddingHorizontal0]}>
                {restaurantHeaderShow && <RestaurantDetailsHeader restaurantInfo={restaurantInfo} />}
                {restaurantInfo.isOpen && <RestaurantService />}
                <RestaurantCategory data={restaurantInfo.categories}/>
                {activeCategory && !specialOfferActive && <RestaurantCategoryItems/>}
                {specialOfferActive && <SpecialOffer />}
            </View>
            {isViewBasket && service_type !== "table_booking" && <ViewBasket />}
            <CartModal />
            <BookingModal />
        </>
    );
}
;
;


export default RestaurantDetailsBody;
