import { UserDTO } from "./UserDTO";
import { UserRolesDTO } from "./UserRolesDTO";

export class LoginDTO{
    id: number;
    Computer_Name:string;
    usersToken: UserDTO;
    constructor(private _id:number,private _computer_name:string,private _user:UserDTO,private _userRole){
        this.id = _id ?? 0;
        this.Computer_Name = _computer_name ?? null;
        this.usersToken = _user ?? null;

    }
}