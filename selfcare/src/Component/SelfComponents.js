import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    height: "50px",
    backgroundColor: "#17B978",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  primaryLabel: {
    fontSize: 20,
    fontWeight: "bold"
  },
  secondaryLabel: {
    fontSize: 16
  },
  labelWhite: {
    color: "white",
    fontSize: 15
  },
  labelBlack: {
    color: "#071A52"
  },
  labelGreen: {
    color: "#17B978"
  },
  input: {
    height: 40,
    width: "100%",
    fontSize: 14,
    color: "#086972",
    paddingLeft: 10,
    marginTop: 11,
    backgroundColor: "#ecebeb",
    borderRadius: 8
  },
  tip: {
    marginTop: 10
  },
  pickerContainer: {
    width: "150px",
    padding: 10,
    borderRadius: 8,
    marginTop: 11,
    backgroundColor: "#ecebeb",
    flexDirection: "row",
    borderWidth: 0
  },
  pickerText: {
    // alignSelf: "flex-start"
  },
  pickerIcon: {
    marginTop: 5,
    marginLeft: 50,
    height: 10,
    width: 10
  }
});

class PrimaryButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.primaryButton, this.props.style]}>
          <Text style={[styles.primaryLabel, styles.labelWhite]}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class PickerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      items: this.props.items
    };
  }

  onSelectedActivity = (item, index) => {
    this.props.onSelected(item, index - 1);
  };

  render() {
    return (
      <>
        <SecondaryLabel style={styles.tip} text={this.props.tip} />
        <Picker
          selectedValue={this.props.selected}
          style={styles.pickerContainer}
          onValueChange={this.onSelectedActivity}
        >
          <Picker.Item label="Selecione" value="" />
          {this.state.items.map((e) => (
            <Picker.Item key={e} label={e} value={e} />
          ))}
        </Picker>
      </>
    );
  }
}

class PrimaryLabel extends React.Component {
  render() {
    return (
      <Text style={[styles.primaryLabel, styles.labelBlack, this.props.style]}>
        {this.props.text}
      </Text>
    );
  }
}

class SecondaryLabel extends React.Component {
  render() {
    return (
      <Text
        style={[styles.secondaryLabel, styles.labelBlack, this.props.style]}
      >
        {this.props.text}
      </Text>
    );
  }
}

class PrimaryGreenLabel extends React.Component {
  render() {
    return (
      <Text style={[styles.primaryLabel, styles.labelGreen, this.props.style]}>
        {this.props.text}
      </Text>
    );
  }
}

class TextField extends React.Component {
  render() {
    return (
      <>
        <SecondaryLabel style={styles.tip} text={this.props.tip} />
        <TextInput
          style={styles.input}
          value={this.props.value}
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
        />
      </>
    );
  }
}

export {
  PrimaryButton,
  PrimaryLabel,
  PrimaryGreenLabel,
  SecondaryLabel,
  TextField,
  PickerButton
};
