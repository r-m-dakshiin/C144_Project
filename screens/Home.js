import * as React from 'react';
import {View, Text, Stylesheet, Image, TouchableOpacity} from 'react-native';
import {Header, AirbnbRating, Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';


export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            articleDetails : {}
        };
    }
    componentDidmount(){
        this.getarticle();


    }


    timeconvert(num){
        var hours = Math.floor(num/60);
        var minutes = num % 60;
        return `${hours}hrs ${minutes}mins`;
    }


    getarticle = () => {
        const  url = "http://localhost:5000/get-article";
        axios
        .get(url)
        .then(response => {
            let details = response.data.data;
            details["duration"] = this.timeconvert(details.duration);
            this.setState({
                articleDetails : details
            });
        })
        .catch(error => {
            console.log(error.message);
        });
    };


    liked_article = () => {
        const  url = "http://localhost:5000/liked-article";
        axios
        .post(url)
        .then(resposne => {
            this.getarticle();
        })
        .catch(error => {
            console.log(error.message);
        });
    };


    unliked_article = () => {
        const  url = "http://localhost:5000/unliked-article";
        axios
        .post(url)
        .then(resposne => {
            this.getarticle();
        })
        .catch(error => {
            console.log(error.message);
        });
    };


    did_not_watch = () => {
        const  url = "http://localhost:5000/did-not-watch";
        axios
        .post(url)
        .then(resposne => {
            this.getarticle();
        })
        .catch(error => {
            console.log(error.message);
        });
    };


    render(){
        const {articleDetails} = this.state;
        if(articleDetails.poster_link){
            const {
                poster_link, 
                title,
                release_date,
                duration,
                overview,
                rating
            } = articleDetails;


            return (
                <View style = {styles.container}>
                    <View style = {styles.headercontiner}>
                        <Header
                        centerComponent = {{
                            text:"article Recommended",
                            style : styles.headertitle
                        }}
                        rightComponent = {{
                            icon : "search",
                            color : "#FFFFFF"
                        }}
                        backgroundColor = {"#d500f9"}
                        contianerStyle = {{
                            flex : 1,
                        }}
                        />
                    </View>


                    <View style = {styles.subcontainer}>
                        <View style = {styles.subtopcontainer}>
                            <Image style = {styles.posterimage} source = {{uri : "poster_link"}}/>
                        </View>


                        <View style = {styles.subbottoncontainer}>
                            <View style = {styles.upperbottomcontainer}>
                                <Text sytle = {styles.title}>
                                    {title}
                                </Text>


                                <Text style = {styles.subtitle}>
                                    {subtitle}
                                </Text>
                            </View>


                            <View style = {styles.middlebottoncontainer}>
                                <View style = {{flex : 0.3}}>
                                    <AirbnbRating
                                    count = {10}
                                    reviews = {["", "", "", "", ""]}
                                    defaultRating = {rating}
                                    isDisabled = {true}
                                    size = {RFValue(25)}
                                    starContainerStyle = {{marginTop:30}}/>
                                </View>


                                <View style = {{flex : 0.7, padding : 15}}>
                                    <Text style = {styles.overview}>{overview}</Text>
                                </View>
                            </View>


                            <View style = {styles.lowerbottoncontainer}>
                                <View style = {styles.iconbuttoncontainer}>
                                    <TouchableOpacity onPress = {this.liked_article}>
                                        <Icon
                                        reverse
                                        name = {"check"}
                                        type = {"Entypo"}
                                        size = {RFValue(30)}
                                        color = {"#7ff03"}/>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress = {this.unliked_article}>
                                        <Icon
                                        reverse
                                        name = {"check"}
                                        type = {"Entypo"}
                                        size = {RFValue(30)}
                                        color = {"#7ff03"}/>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress = {this.did_not_watch}>
                                        <Icon
                                        reverse
                                        name = {"check"}
                                        type = {"Entypo"}
                                        size = {RFValue(30)}
                                        color = {"#7ff03"}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}



