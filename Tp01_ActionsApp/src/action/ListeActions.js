import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({listActions, fonctionSupp, fonctionTerminer}) => {

    return (
        <View>
            {listActions.map((act, i) => { return <UneAction key={i} action={act} fonctionSupp={fonctionSupp} fonctionTerminer={fonctionTerminer}/> })}
        </View>
    );
}

export default ListeActions