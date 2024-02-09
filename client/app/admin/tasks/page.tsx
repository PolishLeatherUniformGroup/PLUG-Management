import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
export default function AdminTasks(){
    return <div className="h-full">
        <div className="grid grid-cols-4 xs:grid-cols-1 gap-10 xs:gap-5">
            <div className="border-r-1 xs:border-r-0 border-default-400 ">
            <Button color="secondary"  className="w-4/5 mx-auto"  variant="shadow" startContent={<FontAwesomeIcon icon={faPlusSquare}/>}>
        Dodaj
      </Button>
            </div>
            <div className="bg-default-100 rounded-md p-3 min-h-96">
                <div className="text-default-500 text-md border-b-1 border-default-300 font-semibold text-center  px-1">Nowe</div>
            </div>
            <div className="bg-default-100 rounded-md p-3 min-h-96">
                <div className=" text-default-500 text-md border-b-2 border-default-300 font-semibold text-center  px-1">W trakcie</div>
            </div>
            <div className="bg-default-100 rounded-md p-3 min-h-96">
                <div className=" text-default-500 text-md  border-b-2 border-default-300 font-semibold text-center  px-1">Zakończone</div>
            </div>
        </div>
    </div>
}