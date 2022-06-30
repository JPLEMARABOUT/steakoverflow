const fs = require("fs");
const {XMLParser} = require("fast-xml-parser");
let path = `${process.cwd()}\\backend\\permissions.xml`
if (process.env.environement==="docker"){
    path = "./permissions.xml";
}

class RolePermissionManager{

    role

    constructor(number) {
        let xml = fs.readFileSync(path).toString();
        const parser = new XMLParser();
        xml = parser.parse(xml);
        delete xml["?xml"];
        xml = xml.roles.role;
        for (let elem of xml){
            if (elem["rank"]===number){
                this.role = elem;
                if (typeof this.role.permission === "string"){
                    this.role.permission = [this.role.permission]
                }
                break;
            }
        }
        return this
    }

    getPermissions(permission){
        if (this.role === undefined){
            return {hasRole:false, message:"The specified role doesn't exist"};
        }
        if (this.role.permission.includes(permission)){
            return {hasRole:true, message:"Ok"};
        }
        return {hasRole:false, message:"The specified role doesn't have the permission for this action"};
    }

    getPermissionList(){
        return this.role.permission;
    }
}

module.exports = RolePermissionManager