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
        this.page = 0;
        this.totalPages = 0
    }

    _loadFilms() {
        this.setState({ isLoading: true });
        if (this.searchedText.length > 0) {
            getFilmsWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    films: [...this.state.films, ...data.results],
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

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: []
        }, () => {
            console.log('Page: ' + this.page + ' / Total pages: ' + this.totalPages + ' / Nb films: ' + this.state.films.length)
            this._loadFilms();
        })
    }

    render() {
        return (

            <View style={styles.main_container}>
                <TextInput
                    onChangeText={(text) => this._searchTextInputChange(text)}
                    onSubmitEditing={() => this._searchFilms()}
                    style={styles.textInput}
                    placeholder='Titre du film' />
                <Button style={styles.button} title="Rechercher" onPress={() => { this._searchFilms() }}></Button>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <FilmItem film={item} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms();
                        }
                    }}
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