import React, {PureComponent} from 'react';

import {
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    StyleSheet
} from "react-native";

import {imgUrl} from '../src/Data';
import {Url} from '../src/Data';
import {spiciesUrl} from '../src/Data';

import axios from 'axios';

const instance = axios.create();

import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class Header extends PureComponent {

    state={
        pokemonName: null,
        pokemonId: 0,
        loaded: 3,
        searchWord: '',
        hide: 0
    }

    searchPokemon=(text)=>{
        if(text == "")
        {
            this.setState({hide: 1})
            return
        }

        let obj = this;

        this.setState({loaded: 0, searchWord: text, pokemonName: null, hide: 0})

        setTimeout(()=>{  
           
            instance.get(Url + text)
            .then(function (response) {  
               obj.setState({
                    loaded: 1, 
                    pokemonName:  response.data.name, 
                    pokemonId: response.data.id
                })                                    
            })
            .catch(function (error) {
                obj.setState({
                    loaded: 2
                })
              
            })

        }, 1000);
    }


    selectPoke=(name, id)=>{
        this.props.AddPokeDetailsFunc([{
                                        name: name,
                                        id: id,
                                        flavuor: [{flavor_text: "", language: {name: ""}}]
                                    }])

        this.props.navigation.navigate('PokePage');

        let obj = this;

        setTimeout(()=>{  
       
            instance.get(spiciesUrl + id  + '/')
            .then(function (response) {  
                obj.props.AddPokeDetailsFunc([{
                    name: name,
                    id: id,
                    flavuor: response.data.flavor_text_entries
                }])                 
            })

        }, 1000);
        
    }


    render() {


        return (
                
            <View style={styles.MainView}>
                
                <View style={styles.ComponentContainer}>

                    <Image  source={require('../src/imgs/mainlogo.png')}
                            style={styles.LogoImg}
                        />
                    <TextInput  style={styles.Input}
                                placeholder="Find Your Fav Pokemon"
                                onChangeText={text =>this.searchPokemon(text)}/>
                    </View> 
                     
                     {this.state.hide == 0 ? <View style={styles.ItemsContainer}>
                            
                            {
                                this.state.loaded == 0 ? 
                                <ActivityIndicator size='large' color='black' />
                                : null
                            }

                            {

                                this.state.loaded != 1 || this.state.pokemonName == null  ? null :
                              
                                   <TouchableOpacity 
                                        style={styles.PokeCard}
                                    onPress={()=>this.selectPoke(this.state.pokemonName, this.state.pokemonId)}
                                       >

                                    <Image  source={{uri: imgUrl + this.state.pokemonId + ".png"}}
                                                    style={{
                                                        height: this.state.loaded != 1 && this.state.pokemonName == null ? 0 : width /2.5,
                                                        resizeMode:'cover', 
                                                        width: width /2.5, 
                                                        marginHorizontal: 5,
                                                        zIndex: 1,
                                                    }}
                                            />

                                    <Text style={styles.PokeName}>{this.state.pokemonName}</Text>

                                </TouchableOpacity>
                                   
                               
                            }
                            
                            {
                                this.state.loaded != 2 ? null :
                                <Text style={styles.ErrorMsg}>Can't find Pokemon :(</Text>
                               
                            }
                            
                        </View> : null}

                       
            </View>
        
        );
    }
}


function mapDispatchToProps(dispatch){
    return{
        AddPokeDetailsFunc: (PokeDetails)=>dispatch({type: 'AddDetails', PokeDetails: PokeDetails}),
    }
}

export default connect(null, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
    MainView:{
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        paddingVertical: 5,
    },
    ComponentContainer:{
        backgroundColor:"#fff",
        flexDirection: 'row',
    },
    LogoImg:{
        resizeMode:'cover', 
        width: 30, 
        height: 30,
        marginHorizontal: 5,
    },
    Input:{
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#949494',
        fontSize: 16,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    ItemsContainer:{
        alignItems: 'center' 
    },
    PokeCard:{
        width: width /2.2, 
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: 'black',
        zIndex: 2,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
    },
    
    PokeName:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333'
    },
    ErrorMsg:{
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold'
    }
})
