
import { PersonnelDTO } from "./PersonnelInfoDTO";
import { UserRolesDTO } from "./UserRolesDTO";

export class UserDTO {
    id: number;
    user_Id: number
    username: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    isActive:boolean;
    isDeleted:boolean;
    isBlocked:boolean;
    personnelInfo: PersonnelDTO;
    userRole:UserRolesDTO[];
    
    
    


    constructor(_id?:number,user_id?:number,_username?:string,_password?:string,_accesstoken?:string,_refreshtoken?:string) {
        this.id = _id ?? 0;
        this.user_Id = user_id ?? 0;
        this.username = _username ?? '';
        this.password = _password ?? '';
        this.accessToken = _accesstoken ?? '';
        this.refreshToken = _refreshtoken ?? '';
        
    }
}

