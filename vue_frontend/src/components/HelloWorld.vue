<template>
  <v-container class="grey lighten-5">
    <v-container class="grey lighten-5 text-center">
      <v-row justify="space-around">
        <v-chip-group center-active multiple show-arrows>
          <v-chip filter outlined>Francais</v-chip>
          <v-chip filter outlined>Thai</v-chip>
          <v-chip filter outlined>Tex-Mex</v-chip>
          <v-chip filter outlined>Sushi</v-chip>
          <v-chip filter outlined>Chinois</v-chip>
          <v-chip filter outlined>Cuisine du monde</v-chip>
          <v-chip filter outlined>Grill</v-chip>
          <v-chip filter outlined>Tacos</v-chip>
          <v-chip filter outlined>Burger</v-chip>
        </v-chip-group>
      </v-row>
    </v-container>
    <v-container class="grey lighten-5 text-center">
      <v-text-field label="Recherche" placeholder="Nom du restaurant"></v-text-field>
    </v-container>
<<<<<<< HEAD
    <v-row v-for="n in 1" :key="n" rows="12" sm="0">  <!-- 3 -->
      <v-col v-for="n in 1" :key="n" cols="12" sm="3"> <!-- 4 -->
=======
    <v-row sm="2">  <!-- v-for="restaurant.id in restaurant" -->
      <v-col cols="12" sm="3"> <!-- 4 -->
>>>>>>> frontend
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>
          <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
          <v-card-title>restaurant.name</v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">restaurant.type</div>
            <div>restaurant.description</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-dialog v-model="dialog" width="800">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">
                  Commander
                </v-btn>
              </template>
              <v-card>
                <v-stepper v-model="e6" vertical>
                  <v-stepper-step :complete="e6 > 1" step="1">
                    Selection du menu
                  </v-stepper-step>
                  <v-stepper-content step="1">
                    <v-card class="mb-12" height="200px">
                      <v-container>
                        <v-card>
                          <v-row>
                            <v-card-text> <!-- v-for nombre d'articles + menu ici -->
                              restaurant.article1
<<<<<<< HEAD
                              <v-btn color="primary" @click="add = add - 1">-</v-btn>
                                {{add}}
                              <v-btn color="primary" @click="add = add + 1">+</v-btn>
                            </v-card-text>

=======
                              <v-btn color="primary" @click="add = add - 1" :disabled="add == 0">-</v-btn>
                                {{add}}
                              <v-btn color="primary" @click="add = add + 1">+</v-btn>
                            </v-card-text>
>>>>>>> frontend
                          </v-row>
                        </v-card>
                        <!-- Boutton ajouter / supprimer les produits-->
                      </v-container>
                      <v-divider></v-divider>
                    </v-card>
                    <v-btn color="primary" @click="e6 = 2">
                      Continuer
                    </v-btn>
                  </v-stepper-content>
                  <v-stepper-step :complete="e6 > 2" step="2">
                    Visualiser le panier
                  </v-stepper-step>
                  <v-stepper-content step="2">
                    <v-card class="mb-12" height="200px">
                      <!-- Page panier -->
                      <v-card-title>
                        Détails du panier
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        n.selected.item
                      </v-card-text>
                    </v-card>
                    <v-btn color="primary" @click="e6 = 3">
                      Continuer
                    </v-btn>
                    <v-btn text @click="e6 = 1">
                      Retour
                    </v-btn>
                  </v-stepper-content>
                  <v-stepper-step :complete="e6 > 3" step="3">
                    Paiement
                  </v-stepper-step>
                  <v-stepper-content step="3">
                    <v-card class="mb-12" height="400px">
                      <!--Page de paiement-->
                      <v-card-title>
                        Détails de paiement
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class='pb-10'>
                        <v-row>
                          <v-col cols='6'>
                            <v-subheader class="grey--text text--lighten-1 pl-0 subheader">Nom du propriétaire de la carte</v-subheader>
                            <v-text-field single-line outlined label="Monsieur Dupond" hide-details/>
                          </v-col>
                          <v-col cols='6'>
                            <v-subheader class="grey--text text--lighten-1 pl-0 subheader">Numéro de la carte</v-subheader>
                            <v-text-field single-line outlined mask="credit-card" hide-details/>
                          </v-col>
                          <v-col col='4'>
                            <v-subheader class="grey--text text--lighten-1 pl-0 subheader">Date d'expiration</v-subheader>
                            <v-select :items="MonthList" label="Month" outlined hide-details/>
                          </v-col>
                          <v-col col='4'>
                            <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
                            <v-select :items="YearList" label="Year" outlined hide-details/>
                          </v-col>
                          <v-col col='4'>
                            <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
                            <v-text-field single-line outlined hide-details/>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <v-btn color="primary" @click="e6 = 4" :to="{ name: 'DeliveryStep'}">
                      Continuer
                    </v-btn>
                    <v-btn text @click="e6 = 2">
                      Retour
                    </v-btn>
                  </v-stepper-content>
                </v-stepper>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">
          {{ link }}
        </v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Steak Overflow</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>
<!--notification system not working wet-->

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloWorld',
  data: () => ({
    e6: 1,
    add: 0,
    MonthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    YearList: ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038']
  })
})
</script>
