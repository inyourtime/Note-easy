import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Category } from "./Category"
import { Customer } from "./Customer"
import { HistoryNote } from "./HistoryNote"

@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: '' })
    content: string

    @Column({ default: 1 })
    version: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date
    }

    @ManyToOne(() => Customer, (customer) => customer.notes)
    customer: Customer

    @OneToMany(() => HistoryNote, (history_note) => history_note.note)
    history_notes: HistoryNote[]

    @ManyToMany(() => Category, (category) => category.notes)
    @JoinTable()
    categories: Category[]

}