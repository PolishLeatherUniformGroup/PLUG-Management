import { Button, Input } from "@nextui-org/react";
import { addFee } from "../actions";

export default function AddFee({memberId, onSuccess, onCancel }: { memberId:string, onSuccess: () => void, onCancel: () => void }) {
    const addFeeAction = addFee.bind(null, onSuccess);
    return (<form className="w-full grid grid-cols-12 gap-2" action={addFeeAction}>
        <Input label="Rok" name="year" className="col-span-6" />
        <Input label="Termin płatności" name="feeDate" type="date" required size="lg"
            value={new Date(Date.now()).toDateString()} className="col-span-6" />

        <Input label="Kwota" name="feeAmount" className="col-span-6" />
        <Input label="Waluta" name="feeCurrency" value="PLN" isReadOnly type="text" className="col-span-6" />
        <input type="hidden" name="memberId" value={memberId} />
        <div className="col-span-12">
            <Button type="submit" color="success" onPress={()=>onSuccess()}>Zapisz</Button>
            <Button type="button" color="danger" onPress={()=>onCancel()}>Anuluj</Button>
        </div>
    </form>);
}
