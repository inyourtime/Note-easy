import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, Index } from "typeorm"
import { Note } from "./Note"
import { IsEmail } from "class-validator"
// import {pbkdf2Sync, randomBytes} from "crypto"
import * as bcrypt from "bcrypt"

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, length: 100 })
    username: string

    @Column({ unique: true, length: 100 })
    @IsEmail()
    email: string

    @Column()
    password: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    registerAt: Date

    @BeforeInsert()
    async hashPassword() {
        const salt: string = await bcrypt.genSalt(10)
        const hash: string = await bcrypt.hashSync(this.password, salt)
        this.password = hash
    }

    @OneToMany(() => Note, (note) => note.customer)
    notes: Note[]

}