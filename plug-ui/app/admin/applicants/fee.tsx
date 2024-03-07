import { Input } from "@nextui-org/react";
import { FeeItemDto } from "../../models/FeeDto";

export function Fee({fee}:{fee?:FeeItemDto|null}) {
return (<div className="grid grid-cols-4 gap-2">
<Input label="Do zapłaty"  type="number" isReadOnly value={`${fee?.requiredFee}`} />
<span className="my-auto">{fee?.currency}</span>
<Input label="Opłacone" isReadOnly  value={`${fee?.paidFee}`}/>
<span className="my-auto">{fee?.currency}</span>
</div>)
}