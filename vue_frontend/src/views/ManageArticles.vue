<!--Cette page est pour les restaurateurs afin qu'ils ajoutent, retirent ou éditent les articles qu'ils souhaitent vendre-->
<template>
  <v-container class="pacing-playground pa-6 text-center">
    <v-data-table :headers="headers" :items="articles" sort-by="name" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Liste de mes articles</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Ajouter un article
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field required v-model="editedItem.name" label="Nom de l'article"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select required :items="items" label="Catégorie" v-model="editedItem.type"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field required v-model="editedItem.price" label="Prix" prefix="€" @keypress="filter(event)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="close">
                Annuler
              </v-btn>
              <v-btn color="green" text @click="save">
                Sauvegarder
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Etes vous sur de supprimer cet article?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="green darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
    <!-- Menu -->
    <v-spacer class="pacing-playground pa-6"></v-spacer>
  </v-container>
</template>

<script>
export default {
  name: 'ManageArticles'
}
</script>
<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      items: ['Entrée', 'Plat', 'Dessert', 'Boissons','Sauces','Autre'],
      headers: [
        {
          text: 'Articles',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Catégorie', value: 'type' },
        { text: 'Prix', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      articles: [
        {
          name: 'Pizza',
          type: 'Entrée',
          price: 12.50,
        },
        {
          name: 'Coca',
          type: 'Boissons',
          price: 2.0,
        },
        {
          name: 'Tiramisu',
          type: 'Dessert',
          price: 8.30,
        },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        type: '',
        price: 0,
      },
      defaultItem: {
        name: '',
        type: '',
        price: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? "Nouvelle article" : "Modifier l'article"
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {
      filter: function(evt) {
        evt = (evt) ? evt : window.event;
        let expect = evt.target.value.toString() + evt.key.toString();
        if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
          evt.preventDefault();
        } else {
          return true;
        }
      },
      editItem (item) {
        this.editedIndex = this.articles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.articles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.articles.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.articles[this.editedIndex], this.editedItem)
        } else {
          this.articles.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
