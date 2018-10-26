import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({fonctionChangerOption}) => (
    <View style={styles.menu}>
        <OptionMenu nomOption="Toutes" activerOption={() => {fonctionChangerOption('Toutes')}}/>
        <OptionMenu  nomOption="Actives" activerOption={() => {fonctionChangerOption('Actives')}}/>
        <OptionMenu   nomOption="Terminées" activerOption={() => {fonctionChangerOption('Terminees')}}/>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu