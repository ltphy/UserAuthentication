import React, {useState} from 'react';
// export class LoadingContextState {
//     isGlobalSpinnerOn:boolean = false;
//     setGlobalSpinner(isGlobalSpinnerOn:boolean){}
// }
// export const LoadingContext: React.Context<LoadingContextState> = React.createContext<LoadingContextState>(new LoadingContextState());
export const GlobalSpinnerContext: React.Context<boolean> = React.createContext<boolean>(false);
export const GlobalSpinnerActionContext: React.Context<Function> = React.createContext<Function>(() => {
});

interface spinnerProps {
    children: any;
}

export const GlobalSpinnerProvider = (props: spinnerProps) => {

    const [isSpinnerOn, setSpinnerOn] = useState<boolean>(false);
    return (
        <GlobalSpinnerContext.Provider value={isSpinnerOn}>
            <GlobalSpinnerActionContext.Provider value={setSpinnerOn}>
                {props.children}
            </GlobalSpinnerActionContext.Provider>
        </GlobalSpinnerContext.Provider>
    )
}
