import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Keyboard,
  Dimensions,
} from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import GradientBorder from "@/components/GradientBorder";
import Heart from "@/svg/heart";

const { height } = Dimensions.get("window");

const UnsubscribeScreen: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
      Animated.timing(keyboardHeight, {
        toValue: event.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleUnsubscribe = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Animated.View style={[styles.container, { paddingBottom: keyboardHeight }]}>
      <Text style={styles.labelText}>Leave your input</Text>

      <TextInput
        style={styles.input}
        placeholder="Let us know why you're leaving to help us improve!"
        placeholderTextColor="#999"
        value={inputText}
        onChangeText={setInputText}
        multiline
      />

      <TouchableOpacity
        onPress={handleUnsubscribe}
        style={[
          styles.unsubscribeButton,
          inputText ? {} : styles.disabledButton,
        ]}
        disabled={!inputText}
      >
        <LinearGradient
          colors={
            inputText ? [colors.secondary, colors.primary] : ["#ccc", "#999"]
          }
          start={{ x: 0.6, y: 0 }}
          end={{ x: 1.4, y: 1 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Confirm and Unsubscribe</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal for the One Time Offer */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.fullScreenModal}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={28} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.modalHeader}>One Time Offer</Text>
            <Text style={styles.modalSubHeader}>Too expensive? We get it.</Text>

            <View style={styles.modalContent}>
              <View style={styles.modalOfferContainer}>
                <View style={styles.modalIconWrapper}>
                  <Heart size={80} />
                  <Ionicons
                    name="gift-outline"
                    size={30}
                    color={colors.primary}
                    style={styles.giftIconPosition}
                  />
                </View>

                <Text style={styles.modalOfferText}>
                  We'd love you to stay!
                </Text>
                <Text style={styles.modalOfferText}>
                  Here’s a {" "}<Text style={styles.discountText}>80% OFF</Text>{" "}
                  discount!
                </Text>

                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceButtonText}>Only $1.69 / month</Text>
                </TouchableOpacity>

                <Text style={styles.smallText}>Lowest price ever</Text>
              </View>
            </View>

            {/* Bottom button */}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.modalCloseButton}
              >
                <LinearGradient
                  colors={
                    inputText
                      ? [colors.secondary, colors.primary]
                      : ["#ccc", "#999"]
                  }
                  start={{ x: 0.6, y: 0 }}
                  end={{ x: 1.4, y: 1 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.claimButtonText}>
                    Claim your limited offer now!
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  labelText: {
    fontSize: fontSize.lg,
    fontFamily: "Nunito-Black",
    color: colors.primary,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    color: colors.background,
    fontSize: fontSize.md,
    fontFamily: "Nunito-Regular",
    padding: 15,
    borderRadius: 10,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 30,
  },
  unsubscribeButton: {
    marginTop: 20,
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: fontSize.base,
    color: "#fff",
    fontFamily: "Nunito-Black",
  },
  disabledButton: {
    opacity: 0.6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingVertical: 50,
  },
  fullScreenModal: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
    justifyContent: "space-around",
    paddingTop: 50,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 30,
  },
  modalContentWrapper: {
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: "transparent",
    overflow: "visible",
  },
  modalOfferContainer: {
    marginTop: 75,
    padding: 30,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 30,
    overflow: "visible",
    borderColor: colors.secondary,
    borderWidth: 3,
    borderRadius: 30,
  },
  modalIconWrapper: {
    position: "absolute",
    top: -50,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  modalHeader: {
    fontSize: 28,
    fontFamily: "Nunito-Black",
    color: colors.primary,
    marginBottom: 5,
    textAlign: "center",
  },
  modalSubHeader: {
    fontSize: fontSize.base,
    fontFamily: "Nunito-Bold",
    color: "#aaa",
    textAlign: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  giftIconPosition: {
    position: "absolute",
    top: 25,
    left: 25,
  },
  modalOfferText: {
    fontSize: fontSize.md,
    fontFamily: "Nunito-Bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  discountText: {
    color: colors.secondary,
    fontSize: fontSize.lg,
  },
  priceButton: {
    marginVertical: 20,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: colors.secondary,
    padding: 20,
  },
  priceButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: "center",
  },
  priceButtonText: {
    color: "#fff",
    fontSize: fontSize.base,
    fontFamily: "Nunito-Black",
  },
  smallText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: "Nunito-Regular",
  },
  modalCloseButton: {
    width: "100%",
    borderRadius: 25,
    overflow: "hidden",
  },
  claimButtonGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  claimButtonText: {
    fontSize: fontSize.base,
    color: "#fff",
    fontFamily: "Nunito-Black",
  },
  buttonWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

export default UnsubscribeScreen;
