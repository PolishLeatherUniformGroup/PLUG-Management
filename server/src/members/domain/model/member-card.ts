import { ValueObject } from "src/core/domain";

interface Props{
    prefix: string;
    number: number;
}

export class MemberCard extends ValueObject<Props>{
    private constructor(props:Props){
        super(props);
    }

    public static create(prefix:string, number:number): MemberCard{
        return new MemberCard({prefix, number});
    }

    public toString(): string {
        return `${this.props.prefix}-${this.props.number.toString().padStart(4, '0')}`;
    }
}