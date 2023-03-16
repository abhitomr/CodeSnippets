import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { useTheme, BaseColor } from "@config";
import { Button, Text } from "@components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Alert(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const relatedLabels = useSelector((state) => state.application.ttbLabels);

  const {
    style,
    children,
    styleContent,
    cancelAction,
    okAction,
    text,
    headline,
    cancelButtonStyle,
  } = props;
  return (
    <View
      style={[
        styles.container,
        { height: Math.round(Dimensions.get("window").height) },
      ]}
    >
      <View style={styles.alertBackground} />
      <View
        style={[
          styles.alert,
          { borderColor: colors.border, backgroundColor: BaseColor.whiteColor },
          style,
        ]}
      >
        {headline && (
          <Text body1 bold>
            {headline}
          </Text>
        )}
        <View style={[styles.content, styleContent]}>
          <Text body1>{text}</Text>
        </View>
        <View
          style={[{ flexDirection: "row", justifyContent: "space-around" }]}
        >
          {cancelAction && (
            <Button
              half
              style={[
                {
                  marginTop: 20,
                  borderRadius: 8,
                  backgroundColor: colors.text,
                },
                cancelButtonStyle,
              ]}
              loading={loading}
              onPress={cancelAction}
            >
              {relatedLabels
                ? relatedLabels.labels.MY_PRO_BTN_UPDT_PRO_CNCL
                : ""}
            </Button>
          )}
          <Button
            half
            style={{ marginTop: 20, borderRadius: 8 }}
            loading={loading}
            onPress={okAction}
          >
            {relatedLabels ? relatedLabels.labels.MY_PRO_BTN_UPDT_PRO_OK : ""}
          </Button>
        </View>
      </View>
    </View>
  );
}

Alert.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContent: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  cancelAction: PropTypes.func,
  okAction: PropTypes.func,
};

Alert.defaultProps = {
  style: {},
  styleContent: {},
  okAction: () => {},
};
