import React from 'react'
import { View, Button, TextInput, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native'
import films from "../Helpers/filmsData"
import FilmItem from "./FilmItem";
import { getFilmsWithSearchedText } from "../API/TMDBApi";
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            isLoading: false
        }

        this.searchedText = "";
    }

    _loadFilms() {
        this.setState({ isLoading: true });
        if (this.searchedText.length > 0) {
            getFilmsWithSearchedText(this.searchedText).then(data => {
                this.setState({
                    films: data.results,
                    isLoading: false
                });
            });
        }
    }

    _searchTextInputChange(text) {
        this.searchedText = text;
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
    }

    render() {
        return (

            <View style={styles.main_container}>
                <TextInput
                    onChangeText={(text) => this._searchTextInputChange(text)}
                    onSubmitEditing={() => this._loadFilms()}
                    style={styles.textInput}
                    placeholder='Titre du film' />
                <Button style={styles.button} title="Rechercher" onPress={() => { this._loadFilms() }}></Button>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <FilmItem film={item} />}
                />
                { this._displayLoading()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 30,
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    button: {
        height: 50
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Search