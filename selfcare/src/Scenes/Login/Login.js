import React from "react";

import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import {
  PrimaryButton,
  PrimaryLabel,
  SecondaryLabel,
  TextField
} from "../../Component/SelfComponents";

const styles = StyleSheet.create({
  headerContainer: {
    heigh: 200,
    backgroundColor: "#17B978"
  },
  image: {
    height: 400,
    width: "100%",
    resizeMode: "cover"
  },
  container: {
    padding: 20,
    marginTop: -200,
    backgroundColor: "white",
    justifyContent: "flex-end",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "gray",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  marginButton: {
    marginTop: 15,
    marginBottom: 10
  },
  marginLabel: {
    marginTop: 20,
    marginBottom: 20
  },
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
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  back = () => {
    this.props.navigation.pop();
  };

  changeEmailValue = (value) => {
    this.setState({ email: value });
  };

  changePasswordValue = (value) => {
    this.setState({ password: value });
  };

  verifyFields = () => {
    if (this.state.email === "" || this.state.password === "") {
      return false;
    }
    return true;
  };

  goToLogin = async () => {
    if (!this.verifyFields()) {
      this.allFieldsAreRequiredMessage();
      return;
    }
    this.props.navigation.navigate("Dashboard");
  };

  allFieldsAreRequiredMessage = () => {
    alert("Todos os campos são obrigatórios");
  };

  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Image
            style={styles.image}
            source={require("../../Assets/background.png")}
          />
          <TouchableOpacity style={styles.iconTouchable} onPress={this.back}>
            <Image
              style={styles.iconBack}
              source={require("../../Assets/icon_back_blue.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <PrimaryLabel
            style={styles.marginLabel}
            text="Já possuí uma conta?"
          />
          <SecondaryLabel
            style={styles.marginBottomLabel}
            text="Informe seus dados para login"
          />
          <TextField
            tip="E-mail"
            value={this.state.email}
            onChangeText={this.changeEmailValue}
            keyboardType="text"
          />
          <TextField
            tip="Senha"
            value={this.state.password}
            onChangeText={this.changePasswordValue}
            keyboardType="text"
          />
          <SecondaryLabel
            style={styles.forgotPasswordLabel}
            text="Esqueceu a senha?"
          />
          <SecondaryLabel
            style={styles.createAccountLabel}
            text="Não possui uma conta? Clique aqui"
          />
          <SecondaryLabel
            style={styles.helcenterLabel}
            text="Central de Ajuda"
          />
          {this.state.isLoading ? (
            <ActivityIndicator style={styles.marginButton} color="#17B978" />
          ) : (
            <PrimaryButton
              style={styles.marginButton}
              onPress={this.goToLogin}
              text="Entrar"
            />
          )}
        </View>
      </View>
    );
  }
}
export default Login;
