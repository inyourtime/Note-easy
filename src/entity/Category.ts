import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, ManyToMany } from "typeorm"
import { Note } from "./Note"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, length: 100})
    name: string

    @ManyToMany(() => Note, (note) => note.categories)
    notes: Note[]

}