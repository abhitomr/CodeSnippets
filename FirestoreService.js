import firestore from "@react-native-firebase/firestore";

export function updateLocationData(locationData, destination, bookingData, timeLeftData) {
  try {
    const tracking = "Tracking";
    const { booking_id } = bookingData;
    const bookingDetails = {
      ...bookingData,
    };

    const locationRef = firestore().collection(tracking);
    locationRef
      .doc("" + booking_id)
      .set({
        arrived: false,
        currentLocation: {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        },
        destinationLocation:{
          ...destination,
        },
        locationData,
        bookingDetails,
        timeLeft:{
          ...timeLeftData
        }
      })
      .then(() => {
      })
      .catch((error) => {
      });
  } catch (error) {
  }
}

export function updateBookingArrivalStatus(bookingId) {
  try {
    const tracking = "Tracking";
    const locationRef = firestore().collection(tracking);
    
    locationRef
      .doc("" + bookingId)
      .update({
        arrived: true
      })
      .then(() => {
      })
      .catch(() => {
      });
  } catch (error) {
  }
}

export function removeLocationData(bookingId) {
  try {
    const tracking = "Tracking";
    const locationRef = firestore().collection(tracking);
    
    locationRef
      .doc("" + bookingId)
      .delete()
      .then(() => {
      })
      .catch(() => {
      });
  } catch (error) {
  }
}