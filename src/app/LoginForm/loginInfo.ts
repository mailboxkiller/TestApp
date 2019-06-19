export class loginInfo{
    username:string = "";
    password:string = "";
    grant_type:string = "password";
    client_id:string = "webTest";
    client_secret:string = "not-a-secret";
};

export class accountCreateInfo{
    email:string = "";
    password:string = "";
    firstname:string = "";
    lastname:string = "";
}

export class accountInfo{
    email:string = "";
    firstname:string = "";
    lastname:string = "";
}

export class loginResponce{
    access_token:string;
    token_type:string;
    expires_in:string;
    refresh_token:string;
}