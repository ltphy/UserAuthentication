import {createSchema, Type, typedModel, ExtractDoc, ExtractProps} from 'ts-mongoose';

const UserModel = createSchema(
    {
        name: Type.string({required: true}),
        email: Type.string({required: true, unique: true}),
        hashedPassword: Type.string({required: true}),
    },
    {timestamps: true}
);
export const User = typedModel('User', UserModel, 'users');
export type UserDoc = ExtractDoc<typeof UserModel>;
export type UserProps = ExtractProps<typeof UserModel>;