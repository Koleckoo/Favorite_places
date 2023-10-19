import { useCallback, useState } from "react";
import { Text, View, TextInput, ScrollView, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectImage, setSelectImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectImage, pickedLocation);
    onCreatePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: colors.primary100,
  },
});
