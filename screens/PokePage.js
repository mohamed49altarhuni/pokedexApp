import React, {PureComponent} from 'react';
import {
    View,
    ScrollView,
    Text,
    Dimensions,
    StyleSheet,
    Image
} from "react-native";

const { width } = Dimensions.get('window');

import { connect } from 'react-redux';

import {imgUrl} from '../src/Data';

class PokePage extends PureComponent {

    render() {

        return (
                
                <View style={styles.MainView}>

                    
                    <ScrollView>
                        
                    <Image  source={{uri: imgUrl + (this.props.PokeDetails[0].id ) + ".png"}}
                            style={styles.PokeImg}
                        />
                         
                    <Text style={styles.PokeNo}>
                        Pokemon No: {(this.props.PokeDetails[0].id )}
                    </Text>

                    <Text style={styles.PokeName}>
                        Pokemon Name: {this.props.PokeDetails[0].name}
                    </Text>

                    <Text style={styles.Details}>Details:</Text>

                    { this.props.PokeDetails[0].flavuor.map((flav, index) => (
                     
                        flav.language.name == "en" ?
                        <Text   style={styles.PokeDetails}
                                key={index}>
                            {flav.flavor_text} 
                        </Text> : null
                    ))}
                                 
                    </ScrollView>

                </View>
        
        );
    }
}

function mapStateToProps(state){
    return{
        PokeDetails: state.PokeDetailsReducer,

    }
}



export default connect(mapStateToProps, null)(PokePage)

const styles = StyleSheet.create({
    MainView:{
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    PokeImg:{
        resizeMode:'cover', 
        width: width - 15, 
        height: width - 15,
        marginHorizontal: 15,
    },
    PokeNo:{
        paddingHorizontal: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    PokeName:{
        paddingHorizontal: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    Details:{
        paddingHorizontal: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    PokeDetails:{
        fontSize: 17,
        paddingHorizontal: 20,
        color: '#111',
        marginBottom: 10,
        marginRight: 10,
        fontWeight: 'bold',
        textAlign: 'left',
    }
});
