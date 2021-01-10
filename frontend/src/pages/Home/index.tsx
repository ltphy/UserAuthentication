import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {useForm} from 'react-hook-form';

const Home = () => {
    const {register, handleSubmit, errors} = useForm();
    const errorMessage: String = "This field is required";
    const doublePattern: RegExp = RegExp("[+-]?([0-9]*[.])?[0-9]+");
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (<form onSubmit={handleSubmit(onSubmit)} id={"pos"}>
        <div>
            <label>x</label>
            <input name={"x"} ref={register({required: true, pattern: doublePattern})} defaultValue={"0"} />
            {errors.x && errorMessage}
            <button type={"submit"} form={"pos"}>Save</button>

        </div>

        <div>
            <label>y</label>
            <input name={"y"} ref={register({required: true, pattern: doublePattern})} defaultValue={"0"}/>

            {errors.y && errorMessage}
            <button type={"submit"} form={"pos"}>Save</button>

        </div>

        <div>
            <label>theta</label>
            <input name={"theta"} ref={register({required: true, pattern: doublePattern})} defaultValue={"0"}/>
            {errors.theta && errorMessage}
            <button type={"submit"} form={"pos"}>Save</button>

        </div>
    </form>);
};
export default withRouter(Home);