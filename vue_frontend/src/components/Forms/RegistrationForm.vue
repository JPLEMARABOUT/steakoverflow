<template>
  <v-card class="d-flex align-center justify-center">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      prepend-icon="mdi-email"
      required
    ></v-text-field>
    <v-text-field
      v-model="firstname"
      :rules="Needentered"
      label="Prénom"
      prepend-icon="mdi-account"
      required
    ></v-text-field>
    <v-text-field
      v-model="lastname"
      :rules="Needentered"
      label="Nom"
      prepend-icon="mdi-account"
      required
    ></v-text-field>
    <v-text-field
      v-model="pseudo"
      :rules="Needentered"
      label="Nom d'utilisateur"
      prepend-icon="mdi-account-box-multiple"
      required
    ></v-text-field>
    <v-text-field
      v-model="birthdate"
      :rules="Needentered"
      label="Date de naissance"
      type="date"
      prepend-icon="mdi-calendar"
      required
    ></v-text-field>
    <v-text-field
      v-model="adresse"
      :rules="Needentered"
      label="Adresse"
      prepend-icon="mdi-map-marker"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Mot de passe"
      prepend-icon="mdi-lock-outline"
      type="password"
      :rules="[required]"
    >
      <template v-slot:append>
        <v-icon
          v-if="successPass"
          color="green"
        >{{ passRule }}</v-icon
        >
        <v-icon
          v-if="!successPass"
          color="red"
        >{{ passRule }}</v-icon
        >
      </template>
    </v-text-field>
    <v-text-field
      v-model="password1"
      label="Vérifier le mot de passe"
      prepend-icon="mdi-lock-outline"
      type="password"
      :rules="[required, matchingPasswords ]"
    >
      <template v-slot:append>
        <v-icon
          v-if="successPass1"
          color="green"
        >{{ passRule1 }}</v-icon
        >
        <v-icon
          v-if="!successPass1"
          color="red"
        >{{ passRule1 }}</v-icon
        >
      </template>
    </v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Vous devez cocher pour valider !']"
      label="Je confirme les données entrées"
      @click="resetValidation"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="createAccount"
    >
      Créer mon compte
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Réinitialiser le formulaire
    </v-btn>
  </v-form>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      firstname: '',
      lastname: '',
      pseudo: '',
      birthdate: '',
      adresse: '',
      password: '',
      valid: true,
      name: 'RegistrationForm',
      emailRules: [
        v => !!v || 'E-mail nécessaire',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      Needentered: [
        v => !!v || 'Le champ doit être rempli'
      ],
      select: null,
<<<<<<< HEAD
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
=======
>>>>>>> frontend
      checkbox: false
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    createAccount: function () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('createAccount', {
          email: this.email,
          prenom: this.firstname,
          nom: this.lastname,
          username: this.pseudo,
          birthdate: this.birthdate,
          password: this.password
        })
      }
    }
  }
}
</script>
