class AnalyseTool{

    orders;
    statistics = {fav:{}, mean:0, daystats:{}};
    locale;

    constructor(orders, locale="fr-FR") {
        this.orders = orders;
        this.locale = locale;
    }

    getFavoriteDishes(){
        let favorites = {}
        for (let elem of this.orders){
            for (let dish of elem.manifest){
                if (favorites[dish]===undefined){
                    favorites[dish] = 1;
                } else {
                    favorites[dish] ++;
                }
            }
        }
        this.statistics.fav = favorites;
        return this
    }

    getMeanOrderValue(){
        let count = 0;
        let i = 0;
        for (let elem of this.orders){
            count += elem.price;
            i++;
        }
        this.statistics.mean = count/i;
        return this
    }

    getMostLoadDaysAndHours(){
        let dates = [];
        for (let elem of this.orders){
            dates.push(new Date(elem.creation_date));
        }
        let hours = {}
        let days = {}
        for (let date of dates){
            let dateSTR = `${(date.getMonth()+1<10?`0${date.getMonth()+1}`:date.getMonth()+1)}/${(date.getDate()<10?`0${date.getDate()}`:date.getDate())}/${date.getFullYear()}`;
            if (days[getDayName(dateSTR, this.locale)]===undefined){
                days[getDayName(dateSTR, this.locale)] = 1;
            } else {
                days[getDayName(dateSTR, this.locale)]++;
            }
            if (hours[date.getHours()]===undefined){
                hours[date.getHours()] = 1;
            } else {
                hours[date.getHours()] ++;
            }
        }
        this.statistics.daystats = {hours: hours, days: days};
        return this;
    }

    getStats(){
        return this.statistics
    }

}

function getDayName(dateStr, locale)
{
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

module.exports = AnalyseTool;