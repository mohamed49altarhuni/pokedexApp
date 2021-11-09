//Special Products For Home
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    StyleSheet
} from "react-native";

import Header from './Header';

import { connect } from 'react-redux';
import {Url} from '../src/Data';
import {imgUrl} from '../src/Data';
import {spiciesUrl} from '../src/Data';

import axios from 'axios';

const instance = axios.create();

const { width } = Dimensions.get('window');

class PokeList extends PureComponent {

    componentDidMount(){ this.addPokes(0) }

    state={
        loading: 0,
        loaded: 0,
        offset: 0,
        isRefreshing: false,
    }

    handleRefresh=()=> this.addPokes(0) 

    handleMorePokes=()=> this.addPokes(this.state.offset) 
   
        
   addPokes=(offset)=>{
           
        if(offset > 151) return
            
        let obj = this;    
        this.setState({loaded: 0})    
        let type = offset == 0 ? 'Add' : 'LoadMore';
              
        setTimeout(()=>{  
        
            instance.get(Url +'?offset='+ offset +'&limit=40')
            .then(function (response) {  
                obj.props.AddPokesFunc(type, response.data.results);
                obj.setState({
                    loaded: 1, 
                    offset:  offset + 40, 
                    isRefreshing: false,
                })                                    
            })
            .catch(function (error) {
                obj.setState({
                    loaded: 2,
                    isRefreshing: false,
                })
                
            });

        }, 1000);
    }

    selectPoke=(name, id)=>{
        this.props.AddPokeDetailsFunc([{
                                        name: name,
                                        id: (id + 1),
                                        flavuor: [{flavor_text: "", language: {name: ""}}]
                                    }])

        this.props.navigation.navigate('PokePage');

        let obj = this;

        setTimeout(()=>{  
        
            instance.get(spiciesUrl + (id + 1) + '/')
            .then(function (response) {  
                obj.props.AddPokeDetailsFunc([{
                    name: name,
                    id: (id+1),
                    flavuor: response.data.flavor_text_entries
                }])
                
                                    
            })
            

        }, 1000);
        
    }

    render() {
        
        return (
                
            <View style={styles.MainView}>

                <Header navigation={this.props.navigation} />       
 
                <FlatList 

                        numColumns={2}
                        data={this.props.Pokes}

                        renderItem={
                            ({item, index}) => ( 
                                <TouchableOpacity 
                                    style={styles.PokeCard}
                                    onPress={()=>this.selectPoke(item.name, index)}
                                    key={item.name}>

                                    <Image  source={{uri: imgUrl + (index + 1) + ".png"}}
                                            style={styles.PokeImage}
                                        />

                                    <Text style={styles.PokeName} >{item.name}</Text>

                                </TouchableOpacity>
                                    
                            )
                            
                        } 

                        ListFooterComponent={(
                            <View>
                                {
                                    this.state.loaded == 0 ?
            
                                        <View style={styles.Loading}>
                
                                            <ActivityIndicator size='large' color='black' />
            
                                        </View>
            
                                    : null
                                } 
            
                                {
                                    this.state.loaded == 2 ?
            
                                        <View style={styles.UnloadContainer}>
                                            
                                            <TouchableOpacity   onPress={()=>this.addPokes()}
                                                                style={styles.TryAgainBtn}>
            
            
                                                <Text style={styles.TryAgainText}>Try Again</Text>
            
                                            </TouchableOpacity>
            
                                        </View>
                
                                    : null
                                }

                            </View>
                        )}

                        listKey ={item => {return item.name }}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleMorePokes}
                        onEndThreshold={0}
                />
               
            </View> 
        );
    }
}

function mapStateToProps(state){
    return{
        Pokes: state.PokesReducer,
    }
}

function mapDispatchToProps(dispatch){
    return{

        AddPokesFunc: (type, Pokes)=>dispatch({type: type, Pokes: Pokes}),
        AddPokeDetailsFunc: (PokeDetails)=>dispatch({type: 'AddDetails', PokeDetails: PokeDetails}),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList)

const styles = StyleSheet.create({
    MainView:{
        zIndex: 2,
        backgroundColor: '#fff'
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
    PokeImage: {
        resizeMode:'cover', 
        width: width /2.5, 
        height: width /2.5,
        marginHorizontal: 5,
    },
    PokeName:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333'
    },
    Loading:{
        paddingVertical: 70,
        alignContent: 'center',
        justifyContent: 'center'
    },
    UnloadContainer:{
        paddingVertical: 100,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    TryAgainBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    TryAgainText:{
        textAlign: 'center',
        fontSize: 20,
    }
})
