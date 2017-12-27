import { Base } from './base'
import { Game } from 'app/model/game'
import { Decimal } from 'decimal.js'


export class Bonus extends Base {
    tickLeft = new Decimal(0)
    constructor(
        id: string,
        name: string,
        description: string,
        game: Game,
        power = new Decimal(1),
        public unitMulti: Base = null,
        allOn = false
    ) {
        super(id, name, description, game)
        this.quantity = power
        game.bonuList.push(this)
        this.alwaysOn = allOn
    }
    getData() {
        const data = super.getData()
        data.rm = this.tickLeft
        return data
    }
    load(data: any) {
        super.load(data)
        if (data.rm)
            this.tickLeft = new Decimal(data.rm)
    }
    getBoost(): Decimal {
        if (!this.isAactive())
            return new Decimal(0)
        else if (this.unitMulti)
            return this.unitMulti.quantity.times(this.quantity)
        else
            return this.quantity
    }
    isAactive(): boolean {
        return this.unlocked && (this.alwaysOn || this.tickLeft.greaterThan(0))
    }
}
