import React from "react";
import { firestore } from "../../DataBase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";
import "react-confirm-alert/src/react-confirm-alert.css";

import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import {
  PrimaryButton,
  SecondaryLabel,
  TextField,
  PrimaryGreenLabel,
  PrimaryLabel
} from "../../Component/SelfComponents";

const styles = StyleSheet.create({
  tileScreen: {
    fontSize: 17
  },
  subtitleScreen: {
    fontSize: 12,
    marginTop: 15
  },
  container: {
    padding: 20,
    backgroundColor: "white"
  },
  saveButton: {
    height: 30,
    marginTop: 10,
    fontSize: 10
  },
  marginButton: {
    marginTop: 15,
    marginBottom: 10
  },
  shadowContainer: {
    padding: 10,
    marginTop: 20,
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
  image: {
    height: 25,
    width: 25,
    marginBottom: 10
  },
  imageItem: {
    marginLeft: 10,
    height: 15,
    width: 15
  },
  containerEmpty: {
    textAlign: "center",
    fontWeight: "regular",
    fontSize: 15,
    padding: 22
  }
});

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      items: [],
      itemToEdit: null,
      isButtonLoading: false,
      isEmpty: true
    };
  }

  fetch = async () => {
    this.setState({ isLoading: true });
    const querySnapshot = await getDocs(collection(firestore, "historico"));
    var items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ isLoading: false });
    this.setState({ isEmpty: items.length === 0 });
    this.setState({ items: items });
  };

  componentDidMount = async () => {
    await this.fetch();
  };

  askToRemove = (item) => {
    const success = window.confirm("Confirma a remoção deste registro?");
    if (success) {
      this.remove(item);
    }
  };

  remove = async (item) => {
    console.log(item);
    this.setState({ isLoading: true });
    const ref = collection(firestore, "historico");
    await deleteDoc(doc(ref, item.id));
    this.fetch();
  };

  verifyFields = () => {
    if (this.state.name === "") {
      return false;
    }
    return true;
  };

  edit = async (item) => {
    this.setState({ itemToEdit: item });
    this.setState({ name: item.name });
  };

  save = async () => {
    if (!this.verifyFields()) {
      this.allFieldsAreRequiredMessage();
      return;
    }
    this.setState({ isButtonLoading: true });
    if (this.state.itemToEdit !== null) {
      await setDoc(doc(firestore, "historico", this.state.itemToEdit.id), {
        name: this.state.name
      });
    } else {
      await addDoc(collection(firestore, "historico"), {
        name: this.state.name
      });
    }
    this.setState({ isButtonLoading: false });
    this.setState({ name: "" });
    this.setState({ itemToEdit: null });
    await this.fetch();
  };

  changeNameValue = (value) => {
    this.setState({ name: value });
  };

  allFieldsAreRequiredMessage = () => {
    alert("Todos os campos são obrigatórios");
  };

  back = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.back}>
            <Image
              style={styles.image}
              source={require("../../Assets/arrow-left.png")}
            />
          </TouchableOpacity>
          <PrimaryGreenLabel
            style={styles.tileScreen}
            text="Histórico Familiar de Saúde"
          />
          <SecondaryLabel
            style={styles.subtitleScreen}
            text="Insira no campo a baixo todas as doenças já existentes na família. Quanto mais informações puder fornecer, mais preciso será seu histórico."
          />
          <View>
            <TextField
              value={this.state.name}
              onChangeText={this.changeNameValue}
            />
            {this.state.isButtonLoading ? (
              <ActivityIndicator style={styles.marginButton} color="#17B978" />
            ) : (
              <PrimaryButton
                style={styles.saveButton}
                onPress={this.save}
                text={
                  this.state.itemToEdit == null ? "Salvar" : "Confirmar edição"
                }
              />
            )}
          </View>
          <View style={styles.shadowContainer}>
            {this.state.isEmpty === true && (
              <PrimaryLabel
                style={styles.containerEmpty}
                text="Nenhum histórico familiar cadastrado até o momento"
              />
            )}
            {this.state.isLoading ? (
              <ActivityIndicator color="#17B978" />
            ) : (
              <FlatList
                data={this.state.items}
                renderItem={({ item }) => (
                  <View>
                    <View style={styles.item}>
                      <SecondaryLabel
                        text={item.name}
                        style={styles.itemsText}
                      />
                      <View style={styles.itemsIcons}>
                        <TouchableOpacity onPress={(e) => this.edit(item)}>
                          <View>
                            <Image
                              style={styles.imageItem}
                              source={require("../../Assets/icon-pen.png")}
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.askToRemove(item)}
                        >
                          <View>
                            <Image
                              style={styles.imageItem}
                              source={require("../../Assets/trash-empty.png")}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default History;
