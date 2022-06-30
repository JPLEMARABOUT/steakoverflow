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
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="login"
      >
        Se connecter
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Réinitialiser le formulaire
      </v-btn>
      <v-btn
        color="primary"
        class="mr-4"
        :to="{ name: 'Register'}"
      >
        Créer un compte
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: 'LoginForm',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail nécessaire',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),

  methods: {
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    login: function () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('loginAccount', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
}
</script>
