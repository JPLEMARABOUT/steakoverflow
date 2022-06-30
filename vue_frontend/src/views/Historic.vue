<template>
  <v-container class="pacing-playground pa-6 text-center">
    <v-card>
      <v-card-title>
        Mes dernieres commandes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Recherche"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="historic" :search="search"></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DeliveryHistoric'
}
</script>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Date de la commande',
            align: 'start',
            value: 'date',
          },
          { text: 'Restaurant', value: 'resto' },
          { text: 'Livreur', value: 'livreur' },
          { text: 'Numéro de commande', value: 'id' },
          { text: 'Produits', value: 'list' },
        ],
        historic: [
          {
            date: '27/07/2022',
            resto: 'Mohamm Eat Hindawi',
            livreur: 'Franquerie',
            id: '5326526815',
            list: ['canard','vin rouge','café'],
          },
        ],
      }
    },
  }
</script>
