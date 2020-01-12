class LoadingService {
    private static _instance: LoadingService;
    //if available return current => static else => new LoadingService
    public static getInstance() {
        return this._instance || (this._instance = new this());
    }
    async sleep(milliseconds:number):Promise<void>{
        const p:Promise<void> = new Promise<void>((resolve,reject)=>{
            setTimeout(resolve,milliseconds);
        });
        return p;
    }
    async wait (milliseconds:number){
        await LoadingService._instance.sleep(milliseconds);
    }
}

export default LoadingService;