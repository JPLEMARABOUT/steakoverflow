const axc = require("./AxiosConnect");

async function test(){
    // axc.setBearer("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0LCJpYXQiOjE2NTYwNjIwNDIsImV4cCI6MTY1NjA5MDg0Mn0.KI4mrEgfQyLre_HQWV445bRz49rNqA4q9RGvoiAa1jQ")
    // await axc.updateRestaurant(74, 'Vk9ReUZORjM3elNQbkhRdTh5d1RFZkZ4dVI4Q1pLUmV5d1J2K1lrMDkycz0=',
    //     {name:"Le jardin d'aziz", cat:'BURGER', description:"Oé on es la hein", image:"IMG"}, async(result)=>{
    //         console.log(result)
    //     await axc.getRestaurantList({commune:"Villeurbanne"}, (result)=>{
    //         console.log(result)
    //     });
    // })


    let result = await axc.getUserLevel(74)
    console.log(result)
}

test();