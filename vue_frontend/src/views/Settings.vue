<template>
  <v-container class="spacing-playground pa-6 text-center">
    <v-card>
      <v-card-title class="text-center">
        Modifier les paramètres du compte SteakOverflow :
      </v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="3">
          <v-card-text class="pa-md-4 mx-lg-auto">
            Email
            <v-spacer></v-spacer>
            <v-text-field v-model="email" filled label="" spacing-playground></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-btn color="primary">
              Changer le mail associé au compte
            </v-btn>
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card-text class="pa-md-4 mx-lg-auto">
            Nom d'utilisateur
            <v-spacer></v-spacer>
            <v-text-field v-model="username" filled label="" spacing-playground></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-btn color="primary">
              Changer le nom d'utilisateur
            </v-btn>
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card-text class="pa-md-4 mx-lg-auto">
            Mot de passe
            <v-spacer></v-spacer>
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" rules="[rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="" hint="8 caractères min" counter filled @click:append="show1 = !show1"
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-btn color="primary">
              Changer le mot de passe
            </v-btn>
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card-text class="pa-md-12 mx-lg-auto">
            <v-btn tile color="error" @click.stop="dialog = true">
              <v-icon left>
                mdi-delete
              </v-icon>
              Supprimer le compte
            </v-btn>
            <v-dialog v-model="dialog" max-width="800">
              <v-card>
                <v-card-title class="text-h5">
                  Etes vous sur de supprimer votre compte ?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text  @click="dialog = false" >
                    Annuler
                  </v-btn>
<<<<<<< HEAD
                  <v-btn color="error" text @click="dialog = false" :to="{ name: 'home'}">
=======
                  <v-btn color="error" text @click="dialog = false" href="/home">
>>>>>>> frontend
                    Supprimer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'AccountSettings'
}
</script>
<script>
  export default {
    data () {
      return {
        show1: false,
        dialog: false,
        password: '',
        rules: {
          min: v => v.length >= 8 || 'Min 8 characters',
        },
        level: ''
      }
    },
  }
</script>
