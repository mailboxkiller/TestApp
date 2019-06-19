/* tslint:disable:variable-name */
export class LoginInfo {
    username = '';
    password = '';
    grant_type = 'password';
    client_id = 'webTest';
    client_secret = 'not-a-secret';
}

export class AccountCreateInfo {
    email = '';
    password = '';
    firstname = '';
    lastname = '';
}

export class AccountInfo {
    email = '';
    firstname = '';
    lastname = '';
}

export class LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;
}
