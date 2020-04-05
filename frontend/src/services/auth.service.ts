
class AuthService {
    private  static _instance: AuthService;
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    // public static instance
    // public async LogIn = ():Promise<> => {
    //
    // }
}

export default AuthService;