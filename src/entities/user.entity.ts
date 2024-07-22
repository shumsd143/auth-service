import {
  Column,
  DataType,
  IsEmail,
  NotEmpty,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @IsEmail
  @NotEmpty({
    msg: "Email cannot be empty",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @NotEmpty({
    msg: "Phone number cannot be empty",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "The phone number of the user",
  })
  phone: string;

  @Column({ type: DataType.STRING })
  password: string;
}
