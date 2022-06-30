<template>
  <v-container>
    <v-card class="pacing-playground pa-6 mx-auto">
      <v-card-title>
        Progression de la commande
      </v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card-text class="pacing-playground pa-6 mx-auto">
            <v-alert border="left" type="success">Le restaurateur a accepté la commande</v-alert>
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card-text class="pacing-playground pa-6 mx-auto">
            <v-alert border="left" type="success">Le livreur a pris la commande</v-alert>
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card-text class="pacing-playground pa-6 mx-auto">
            <v-alert border="left" type="success">Le livreur est arrivé</v-alert>
          </v-card-text>
        </v-col>
      </v-row>
      <v-progress-linear color="teal" buffer-value="33" value="0" stream></v-progress-linear>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'DeliveryStep'
}
</script>
