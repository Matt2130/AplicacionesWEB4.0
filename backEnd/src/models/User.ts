import { Document, Schema, Types, model } from "mongoose";

interface IUserRole {
    roleId: Types.ObjectId,
  name: string;
  type: "Administrador" | "Cliente" | "Empleado";
  status: boolean;
};

export interface IUser extends Document {
    _id: Types.ObjectId,
    username:string;
    email:string;
    password:string;
    status:boolean;
    createDate:Date;
    deleteDate:Date;
    firstName:string;
    lastName:string;
    roles: IUserRole[];
};

  const UserRoleSchema = new Schema<IUserRole>({
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Administrador", "Cliente", "Empleado"],
        default: "Cliente"
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { _id: false});

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    deleteDate:{
        type:Date
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    roles: {
    type: [UserRoleSchema],
    required: true,
    validate: [(array: string | any[]) => array.length > 0, 'Debe contener al menos un rol']
  }
},
    { versionKey: false }
);

export const User = model<IUser>('User',userSchema, 'user');