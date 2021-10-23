import React from "react";

import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ref, onValue } from "firebase/database";
import { database } from "../../DataBase/firebase";

import { PrimaryLabel, SecondaryLabel } from "../../Component/SelfComponents";

const styles = StyleSheet.create({
  headerContainer: {
    heigh: 200,
    backgroundColor: "#17B978"
  },
  image: {
    height: 24,
    width: 24,
    margin: 20,
    alignSelf: "flex-end"
  },
  connectCareBandBanner: {
    margin: 16,
    padding: 10,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  connectCareBandTitleLabel: {
    fontSize: 17
  },
  connectCareBandSubTitleLabel: {
    fontSize: 13
  },
  marginButton: {
    marginTop: 15,
    marginBottom: 10
  },
  marginLabel: {},
  marginBottomLabel: {
    marginBottom: 20
  },
  helcenterLabel: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },
  createAccountLabel: {
    textAlign: "center",
    marginTop: 20
  },
  forgotPasswordLabel: {
    textAlign: "right",
    marginTop: 20,
    fontWeight: "bold"
  },
  shadowContainer: {
    padding: 10,
    justifyContent: "flex-end",
    borderRadius: 8,
    shadowColor: "gray",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  flexContainer: {
    padding: 10
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    justifyContent: "flex-end",
    borderRadius: 15,
    shadowColor: "gray",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  titleItemContainer: {
    fontSize: 16
  },
  subtitleItemContainer: {
    marginTop: 20,
    fontSize: 13
  },
  recordTitleItemContainer: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: "bold"
  },
  imageItemContainer: {
    height: 24,
    width: 24,
    alignSelf: "flex-end"
  },
  columnContainer: {},
  item: {
    paddingRight: 10,
    paddingLeft: 10,
    height: 40
  },
  itemsText: {
    marginBottom: -25,
    height: 30
  },
  itemsIcons: {
    alignSelf: "flex-end",
    flexDirection: "row"
  },
  iconBack: {
    resizeMode: "cover",
    height: 23,
    width: 12
  },
  iconTouchable: {
    position: "absolute",
    height: 23,
    width: 12,
    left: 20,
    top: 40
  },
  background: {
    backgroundColor: "white"
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      freqCard: "",
      temp: 0.0,
      oximetro: ""
    };
  }

  fetch = async () => {
    const my = this;
    this.getValue("FreqCard", function (data) {
      my.setState({ freqCard: data });
    });
    this.getValue("temp", function (data) {
      my.setState({ temp: data });
    });
    this.getValue("Oximetro", function (data) {
      my.setState({ oximetro: data });
    });
  };

  getValue = (name, callback) => {
    const starCountRef = ref(database, name);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  };

  componentDidMount = async () => {
    await this.fetch();
  };

  showHistory = () => {
    this.props.navigation.navigate("History");
  };

  render() {
    return (
      <View style={styles.background}>
        <TouchableOpacity onPress={this.showHistory}>
          <Image
            style={styles.image}
            source={require("../../Assets/profile.png")}
          />
        </TouchableOpacity>
        <View style={styles.connectCareBandBanner}>
          <PrimaryLabel
            style={styles.connectCareBandTitleLabel}
            text="Conectar CareBand"
          />
          <SecondaryLabel
            style={styles.connectCareBandSubTitleLabel}
            text="Configure seu CareBand e experimente nossos serviços"
          />
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.rowContainer}>
            <ItemContainer
              title="Caderno de Oxímetro"
              subtitle="Última aferição:"
              value={"SpO2: " + this.state.oximetro + "%"}
            />
            <ItemContainer
              title="Ritmo Cardíaco"
              subtitle="Última aferição:"
              value={"BPM: " + this.state.freqCard}
            />
          </View>
          <View style={styles.rowContainer}>
            <ItemContainer
              title="Tensão Arterial"
              subtitle="Registre os dados coletados"
            />
            <ItemContainer
              title="Temperatura Corporal"
              subtitle="Última aferição:"
              value={this.state.temp.toFixed(1) + " ºC"}
            />
          </View>
        </View>
      </View>
    );
  }
}

class ItemContainer extends React.Component {
  render() {
    return (
      <View style={styles.itemContainer}>
        <PrimaryLabel
          style={styles.titleItemContainer}
          text={this.props.title}
        />
        <SecondaryLabel
          style={styles.subtitleItemContainer}
          text={this.props.subtitle}
        />
        <SecondaryLabel
          style={styles.recordTitleItemContainer}
          text={this.props.value}
        />
        <View>
          <Image
            style={styles.imageItemContainer}
            source={require("../../Assets/arrow-right.png")}
          />
        </View>
      </View>
    );
  }
}
export default Dashboard;
