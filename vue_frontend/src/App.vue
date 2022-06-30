<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    drawer: false,
    group: null
  })
})
</script>

<template>

  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-flex> <v-img src='./assets/logos.png'
                      max-height="95"
                      max-width="500"
      ></v-img> </v-flex>

      <v-spacer></v-spacer>
      <v-btn v-if="($store.state.user.token)" icon :to="{ name: 'AccountSettings'}">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn v-if="($store.state.user.token)"
             depressed
             color="error"
             href="/home"
      >
        Déconnexion
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="position:fixed"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="yellow lighten-2--text text--accent-4"
          fixed
        >
          <v-list-item :to="{ name: 'home'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="(!$store.state.user.token)" :to="{ name: 'Login'}">
            <v-list-item-icon>
              <v-icon>mdi-account-key</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Connexion</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="(!$store.state.user.token)" :to="{ name: 'Register'}">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inscription</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'DeliveryHistoric'}">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mes commandes</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'ManageArticles'}">
            <v-list-item-icon>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Gestion des articles</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'ManageMenu'}">
            <v-list-item-icon>
              <v-icon>mdi-food</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Gestion des menus</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Legal'}">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-text</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mentions légales</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
