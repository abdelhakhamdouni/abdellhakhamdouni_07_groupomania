import * as moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')

export default class User {
        id: number;
        firstName: string;
        lastName: string;
        avatar: string;
        email: string;
        password: string;
        createdAt: string;
        isAdmin:boolean;
    constructor(id,firstName,lastName,avatar,email,password,createdAt,isAdmin){}

    public static fromJsonToUser(json: any): User{
        return json
    }

}
