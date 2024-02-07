export class Money{
    constructor(
        public readonly amount:number,
        public readonly currency:string
    ){}

    public add ( right:Money):Money{
        if(this.currency !== right.currency){
            throw new Error("Cannot add different currency.")
        }
        return new Money(this.amount+right.amount, this.currency);
    }

    public multiply ( right:number):Money{
        return new Money(this.amount*right, this.currency);
    }

    public eq(other:Money):boolean{
        if(this.currency !== other.currency){
            new Error("Cannot compare different currency");
        }
        return this.amount === other.amount;
    }

    public lte(other:Money):boolean{
        if(this.currency !== other.currency){
            new Error("Cannot compare different currency");
        }
        return this.amount <= other.amount;
    }

    public lt(other:Money):boolean{
        if(this.currency !== other.currency){
            new Error("Cannot compare different currency");
        }
        return this.amount < other.amount;
    }
    public gte(other:Money):boolean{
        if(this.currency !== other.currency){
            new Error("Cannot compare different currency");
        }
        return this.amount >= other.amount;
    }

    public gt(other:Money):boolean{
        if(this.currency !== other.currency){
            new Error("Cannot compare different currency");
        }
        return this.amount >= other.amount;
    }
}