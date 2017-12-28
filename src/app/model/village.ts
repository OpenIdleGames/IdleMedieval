import { Unit } from './unit'
import { Game } from './game'
import { Base } from './base'
import { Races, Malus } from './types'
import { Cost } from 'app/model/cost'
import { KingOrder } from 'app/model/action'

export class Village {

    keep = false
    id = ""

    static GenerateVillage(game: Game): Village {
        const village = new Village()
        village.avaiableRaces.push(Races[Math.floor(Math.random() * Races.length)])

        village.malus.push(Malus[Math.floor(Math.random() * Malus.length)])
        return village
    }

    constructor(
        public name: string = "",
        public avaiableRaces: Array<string> = new Array<string>(),
        public startingStuff: Array<[Base, Decimal]> = new Array<[Base, Decimal]>(),
        public avaiableStuff: Array<Base> = new Array<Base>(),
        public gainMulti: Array<[Unit, Decimal]> = new Array<[Unit, Decimal]>(),
        public kingOrders: Array<KingOrder> = new Array<KingOrder>(),
        public malus: Array<string> = new Array<string>()
    ) {

    }

    getSave() {
        const data: any = {}
        data.vn = this.name
        data.vr = this.avaiableRaces
        data.vk = this.keep
        data.vs = this.startingStuff.map(b => [b[0].id, b[1]])
        data.va = this.avaiableStuff.map(a => a.id)
        data.vg = this.gainMulti.map(g => [g[0].id, g[1]])
        data.vo = this.kingOrders.map(ko => ko.getData())
        data.vm = this.malus
        return data
    }
    loadData(data: any, game: Game) {
        if (data.vn)
            this.name = data.vn
        if (data.vr)
            this.avaiableRaces = data.vr
        if (data.vk)
            this.keep = data.vk
        if (data.vs && data.vs.lenght > 0)
            data.vs.foreach(st => {
                const stuff = game.allMap.get(st[0])
                if (stuff) {
                    const num = new Decimal(st[1])
                    this.startingStuff.push([stuff, num])
                }
            })
        if (data.va && data.va.lenght > 0)
            data.va.foreach(st => {
                const stuff = game.allMap.get(st)
                if (stuff)
                    this.avaiableStuff.push(stuff)
            })
        if (data.vg && data.vg.lenght > 0)
            data.vg.foreach(ga => {
                const stuff = game.allMap.get(ga[0])
                if (stuff && stuff instanceof Unit) {
                    const num = new Decimal(ga[1])
                    this.gainMulti.push([stuff, num])
                }
            })
        if (data.vm)
            this.avaiableRaces = data.vm
    }


}