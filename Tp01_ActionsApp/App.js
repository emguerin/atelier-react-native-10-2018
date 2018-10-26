import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        actionsAffichees: [],
        optionActivee: 'Toutes'
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie à changée', nouvelleSaisie)
        this.setState({texteSaisie: nouvelleSaisie})
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        console.log('Vous avez cliqué sur Valider !')
        let listActions = this.state.actions
        let action = {
            'titre' : this.state.texteSaisie,
            'isTermine' : false
        }
        listActions.push(action)
        this.setState({actions: listActions, texteSaisie: ''}, () => this.rafraichirListeAffichee());
    }

    /**
     * Méthode invoquée lors du clic sur le bouton Supprimer une action
     */
    supprimerAction = (index) => {
        console.log('Suppression action')
        let listActions = this.state.actions
        listActions.splice(index,1)
        this.setState({actions: listActions}, () => this.rafraichirListeAffichee())
    }

    /**
     * Méthode invoquée lors du clic sur Terminer une action
     */
    terminerAction = (index) => {
        console.log("Clic sur Terminer");
        let listActions = this.state.actions
        let action = listActions[index]
        action.isTermine = !action.isTermine
        listActions[index] = action
        this.setState({actions: listActions}, () => this.rafraichirListeAffichee())
    }

    /**
     * Méthode invoquée pour changer l'option activée
     */
    changerOption = (newOption) => {
        this.setState({optionActivee: newOption}, () => this.rafraichirListeAffichee());
    }

    /**
     * Méthode invoquée pour mettre à jour la liste des actions à afficher
     */
    rafraichirListeAffichee() {
        let state = this.state
        let option = state.optionActivee
        let all_actions = state.actions
        let actions_affichees = []

        if ('Terminees' === option) {
            actions_affichees = all_actions.filter(act => act.isTermine)
        }
        else if ('Actives' === option) {
            actions_affichees = all_actions.filter(act => !act.isTermine)
        }
        else {
            actions_affichees = all_actions
        }
        this.setState({actionsAffichees: actions_affichees})
    }

    render() {
        const texteSaisie = this.state.texteSaisie
        const actionsAffichees = this.state.actionsAffichees

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions listActions={actionsAffichees} fonctionSupp={this.supprimerAction} fonctionTerminer={this.terminerAction}/>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu fonctionChangerOption={this.changerOption}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})