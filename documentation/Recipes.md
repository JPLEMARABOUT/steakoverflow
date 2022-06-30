# Recipe API documentation

*In this document, it will be exposed how to consume the micro-service API dedicated to return each restaurants articles and menus*

## Quick Access

[Create Recipe into DB](#create_bd)
[Get list of the articles (with constraints)](#get_recipe)
[Get multiple recipes by their ID](#get_recipe_id)
[Update Recipe](#update_recipe)
[Delete Recipe](#delete_recipe)
[Create Menu](#create_menu)
[Get Menu](#get_menu)
[Update Menu](#update_menu)
[Delete Menu](#delete_menu)

## Recipes

### Create Recipe into DB <a name="create_bd"> </a>

*Allows a restaurant owner (role 1) to create a new article that will be added into the DB*

###### Token Required

***Request Exemple***

```
http://localhost:8083/create_recipe?id=74&data={"prop_id":74, "restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=", "price":8.95, "name":"Choucroute", "ingredients":["fraise", "cassis"], "type":"PLAT"}
```

***PARAMS :***

id : The user ID in the DB
data : The JSON Data to be sent to create a restaurant
	-prop_id : the userId into the DB
	-restaurant_id : The id of the restaurant on which the article is linked with.
	-price : the price of the article
	-name : the name of the article
	-ingredients : a list of all the ingredients that are in the dish
	-type : the type (chosen between DESSERT, PLAT and ENTREE)

***Response exemple :***

```json
{"success":true, "message":"Ok"}
```

### Get list of the articles (with constraints) <a name="get_recipe"> </a>

*Returns the list of each of the articles, it may be constrainted*

***Request Exemple***

```
http://localhost:8083/list_recipes?constraint={"restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0="}
```

***PARAMS :***

constraint : A json with the searched value with the specified key

***Response Exemple***

```json
[{"ingredients":["fraise","cassis"],"price":14.99,"id":"ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=","name":"Coulis du chef","restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=","prop_id":74,"type":"DESSERT"},{"ingredients":["fraise","cassis"],"price":8.95,"id":"NGtINTh6NFAzaG9wZzBGR2dTVWVYVnRzVExvMThIRVRSZGExOFVpdjJzQT0=","name":"Choucroute","restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=","prop_id":74,"type":"PLAT"}]
```

### Get multiple recipes by their ID <a name="get_recipe_id"> </a>

*Returns the list of articles, specially conceived for multiple ID research*

***Request Exemple***

```
http://localhost:8083/list_recipes_multiple?constraint={"id":["ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=", "NGtINTh6NFAzaG9wZzBGR2dTVWVYVnRzVExvMThIRVRSZGExOFVpdjJzQT0="]}
```

***PARAMS :***

costraint : A json format containing the key and as value an array where all the wanted values are specified

***Response Exemple***

```json
[{"ingredients":["fraise","cassis"],"price":14.99,"id":"ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=","name":"Coulis du chef","restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=","prop_id":74,"type":"DESSERT"},{"ingredients":["fraise","cassis"],"price":8.95,"id":"NGtINTh6NFAzaG9wZzBGR2dTVWVYVnRzVExvMThIRVRSZGExOFVpdjJzQT0=","name":"Choucroute","restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=","prop_id":74,"type":"PLAT"}]
```

### Update Recipe <a name="update_recipe"> </a>

*Allow user to update an article into DB by sending new values (only if this one is linked with his restaurant)*

###### TOKEN REQUIRED

***Request Exemple***

```
http://localhost:8083/update_recipe?id=74&recipe=ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=&data={"ingredients":["fraise","cassis", "groseille"]}
```

***PARAMS :***

id : the user ID
recipe : the ID of the reciped to be modified
data : a JSON containing the key and the value to be modified

***Response Exemple***

```json
{"success":true,"message":"Ok"}
```

### Delete Recipe <a name="delete_recipe"> </a>

*Allows the user to delete the article by sending it's ID (only if this one is linked with his restaurant)*

###### TOKEN REQUIRED

***Request Exemple***

```
http://localhost:8083/delete_recipe?id=74&recipe=ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=
```

***PARAMS :***

id : the Id of the user
recipe : the id of the reciped that you want to delete

***Response Exemple***

```json
{"success":true,"message":"Ok"}
```

## Menus

### Create Menu <a name="create_menu"> </a>

*This API allows a restaurant owner to add Menu for his restaurant*

###### TOKEN REQUIRED

***Request Exemple***

```
http://localhost:8083/create_menu?data={"dish_list":["ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0="], "price":22.50, "restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=", "prop_id":74}&id=74
```

***PARAMS : ***
id : the user id 
data : A json data owning :
	-dish_list : an array with all the ids of the dishes in the menu
	-price : the price of the menu
	-prop_id : the user ID
	-restaurant_id : the id of the restaurant the menu is linked to

***Response exemple***

```json
{"success":true,"message":"Ok"}
```

### Get Menu <a name="get_menu"> </a>

*This API allows to get the list of the menus*

***Request Exemple***

```
http://localhost:8083/read_menu?`constraint={"id":""eVFaL3lqdVJPOUZiZW9oS2RPNFR0Qk5PdFRpeTRXaUVCdTMxZjhrZTJRND0="}
```

***Params : ***

constraint : a json with the key and the value wanted

***Response Exemple***

```json
[{"dish_list":["ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=","NGtINTh6NFAzaG9wZzBGR2dTVWVYVnRzVExvMThIRVRSZGExOFVpdjJzQT0="],"price":25,"restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=","prop_id":74,"id":"eVFaL3lqdVJPOUZiZW9oS2RPNFR0Qk5PdFRpeTRXaUVCdTMxZjhrZTJRND0="}]
```

### Update Menu <a name="update_menu"> </a>

*This API allows the user to edit a menu bu sending the values in json*

###### TOKEN REQUIRED

***Request Exemple***

```
http://localhost:8083/update_menu?id=74&data={"dish_list":["ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=", "NGtINTh6NFAzaG9wZzBGR2dTVWVYVnRzVExvMThIRVRSZGExOFVpdjJzQT0="],"price":25,"restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=","prop_id":74,"id":"eVFaL3lqdVJPOUZiZW9oS2RPNFR0Qk5PdFRpeTRXaUVCdTMxZjhrZTJRND0="}&menu=eVFaL3lqdVJPOUZiZW9oS2RPNFR0Qk5PdFRpeTRXaUVCdTMxZjhrZTJRND0=
```

***PARAMS :***

id : the user ID
menu : the id of the menu you want to modify
data : the data you want to modifi, in a format JSON, the key to modify and the new value

```json
{"dish_list":["ZlJGVXBSc1lOYlo3bFoyTlZCUEhHQmlwSWN2ZEtIN1hnR3JGYjd4eUhTbz0=", "NGtINTh6NFAzaG9wZzBGR2dTVWVYVnRzVExvMThIRVRSZGExOFVpdjJzQT0="],"price":25,"restaurant_id":"Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=","prop_id":74,"id":"eVFaL3lqdVJPOUZiZW9oS2RPNFR0Qk5PdFRpeTRXaUVCdTMxZjhrZTJRND0="}
```

***Response Exemple***

```json
{"success":true,"message":"Ok"}
```

### Delete Menu <a name="delete_menu"> </a>

*This API allows the user to delete a menu*

###### TOKEN REQUIRED

***Request Exemple***

```
http://localhost:8083/delete_menu?id=74&menu=eVFaL3lqdVJPOUZiZW9oS2RPNFR0Qk5PdFRpeTRXaUVCdTMxZjhrZTJRND0=
```

***PARAMS :***

id : The id of the user
menu : the ID of the menu you want to delete

***Response Exemple***

```json
{"success":true,"message":"Ok"}
```
